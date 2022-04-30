const RegistrationForm = require("../models/registrationForm");
const fs = require("fs");
var nodemailer = require('nodemailer');
const path = require('path')
var handlebars = require('handlebars');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'awardsidm@gmail.com',
    pass: 'gllznygeziabftrf'
  }
});


exports.postRegistrationForm = (req, res, next) => {

  const category = req.body.category;
  const typeOfApplicant = req.body.typeOfApplicant;
  const subCategoryDoccument = req.body.subCategoryDoccument;
  const financialDoccument = req.body.financialDoccument;
  const nameOfCompany = req.body.nameOfCompany;
  const addressl1 = req.body.addressl1;
  const addressl2 = req.body.addressl2;
  const state = req.body.state;
  const city = req.body.city;
  const pincode = req.body.pincode;
  const name = req.body.name;
  const designation = req.body.designation;
  const email = req.body.email;
  const mobileNumber = req.body.mobileNumber;
  const panNumber = req.body.panNumber;
  const gstinOfCompany = req.body.gstinOfCompany;
  const documentGstCertificate = req.body.documentGstCertificate;
  const dateOfCompany = req.body.dateOfCompany;
  const sidmMember = req.body.sidmMember;
  const sidmMemberShipNumber = req.body.sidmMemberShipNumber;
  const association = req.body.association;
  const associationName = req.body.associationName;
  const registeredOrganization = req.body.registeredOrganization;
  const nameRegisteredOrganization = req.body.nameRegisteredOrganization;
  const aboutCompany = req.body.aboutCompany;
  const sidmChampionAwards = req.body.sidmChampionAwards;
  const isappreciation = req.body.isappreciation;
  const appreciationDocuments = req.body.appreciationDocuments;
  const campareAchivement = req.body.campareAchivement;
  const mudp = req.body.mudp;
  const productLink = req.body.productLink;
  const exhibit1 = req.body.exhibit1;
  const exhibit2 = req.body.exhibit2;
  const status = req.body.status;
 const alterMobileNumber= req.body.alterMobileNumber;
  const alterEmail= req.body.alterEmail
  const form = new RegistrationForm({
    category: category,
    typeOfApplicant: typeOfApplicant,
    subCategoryDoccument: subCategoryDoccument,
    financialDoccument: financialDoccument,
    nameOfCompany: nameOfCompany,
    addressl1: addressl1,
    addressl2: addressl2,
    state: state,
    city: city,
    pincode: pincode,
    name: name,
    designation: designation,
    email: email,
    mobileNumber: mobileNumber,
    panNumber: panNumber,
    gstinOfCompany: gstinOfCompany,
    documentGstCertificate: documentGstCertificate,
    dateOfCompany: dateOfCompany,
    sidmMember: sidmMember,
    sidmMemberShipNumber: sidmMemberShipNumber,
    association: association,
    associationName: associationName,
    registeredOrganization: registeredOrganization,
    nameRegisteredOrganization: nameRegisteredOrganization,
    aboutCompany: aboutCompany,
    sidmChampionAwards: sidmChampionAwards,
    isappreciation: isappreciation,
    appreciationDocuments: appreciationDocuments,
    campareAchivement: campareAchivement,
    mudp: mudp,
    productLink: productLink,
    exhibit1: exhibit1,
    exhibit2: exhibit2,
    status: status,
    alterMobileNumber:alterMobileNumber,
    alterEmail:alterEmail,
    remark:null
  });
 
  form
    .save()
    .then((result) => {
      const filePath = path.join(__dirname, '../view/email.html');
      const source = fs.readFileSync(filePath, 'utf-8').toString();
      const template = handlebars.compile(source);
      const replacements = {
        email: result.email,
        mobileNumber:result.mobileNumber,
        PanNumber:result.panNumber

      };
      const htmlToSend = template(replacements);
      var mailOptions = {
        from: 'awardsidm@gmail.com',
        to: result.email,
        subject: 'SIDM Champion Award 2022',
        html: htmlToSend
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.json(error);
        } else {
          res.status(200).json('Please check your email');
        }
      });
  
      res.status(200).json('successfully sumbit');
    })
    .catch((err) => {
       res.json(err);
    });
};

exports.getForms = (req, res, next) => {
  const page = req.query.page || 1;
  const itemPerPage = req.query.itemPerPage || 10;
  let totalItems;
  RegistrationForm.find()
    .countDocuments()
    .then((numOfForm) => {
      totalItems = numOfForm;
      return RegistrationForm.find()
        .skip((page - 1) * itemPerPage)
        .limit(itemPerPage);
    })
    .then((data) => {
      if (data) {
        res.status(200).json({
          forms: data,
          currentPage: page,
          hasNextPage: itemPerPage * page < totalItems,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: Math.ceil(totalItems / itemPerPage),
        });
      } else {
        res.status(404).json("not Found");
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.getUserData = (req, res, next) => {
  const email = req.body.email;
  const mobileNumber = req.body.mobileNumber;
  const panNumber = req.body.panNumber;
  RegistrationForm.findOne({
    mobileNumber: mobileNumber,
    email: email,
    panNumberOfOrganization: panNumber,
  })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json("not Found user Data");
      }
    })
    .catch((err) => {
      res.status(404).json("not Found");
    });
};

exports.getmemberData = (req, res, next) => {
  const memberId = req.params.memberId;
  RegistrationForm.findById(memberId)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json("not Found");
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.updateFrom = (req, res, next) => {
  const userID = req.params.userID
  const createAt = req.body.currentDate;
  const typeOfApplicant = req.body.typeOfApplicant;
  const subCategoryDoccument = req.body.subCategoryDoccument;
  const financialDoccument = req.body.financialDoccument;
  const nameOfCompany = req.body.nameOfCompany;
  const addressl1 = req.body.addressl1;
  const addressl2 = req.body.addressl2;
  const state = req.body.state;
  const city = req.body.city;
  const pincode = req.body.pincode;
  const name = req.body.name;
  const designation = req.body.designation;
  const email = req.body.email;
  const mobileNumber = req.body.mobileNumber;
  const panNumber = req.body.panNumber;
  const gstinOfCompany = req.body.gstinOfCompany;
  const documentGstCertificate = req.body.documentGstCertificate;
  const dateOfCompany = req.body.dateOfCompany;
  const sidmMember = req.body.sidmMember;
  const sidmMemberShipNumber = req.body.sidmMemberShipNumber;
  const association = req.body.association;
  const associationName = req.body.associationName;
  const registeredOrganization = req.body.registeredOrganization;
  const nameRegisteredOrganization = req.body.nameRegisteredOrganization;
  const aboutCompany = req.body.aboutCompany;
  const sidmChampionAwards = req.body.sidmChampionAwards;
  const isappreciation = req.body.isappreciation;
  const appreciationDocuments = req.body.appreciationDocuments;
  const campareAchivement = req.body.campareAchivement;
  const mudp = req.body.mudp;
  const productLink = req.body.productLink;
  const exhibit1 = req.body.exhibit1;
  const exhibit2 = req.body.exhibit2;
  const status = req.body.status;
  const alterMobileNumber= req.body.alterMobileNumber;
  const alterEmail= req.body.alterEmail
  RegistrationForm.findById(userID)
    .then((formData) => {
    
      formData.createAt = createAt;
          formData.typeOfApplicant= typeOfApplicant;
          if (subCategoryDoccument !== formData.subCategoryDoccument) {
            formData.subCategoryDoccument = subCategoryDoccument;
          }
          if (financialDoccument !== formData.financialDoccument) {
            formData.financialDoccument = financialDoccument;
          }
         
          formData.nameOfCompany= nameOfCompany;
          formData.addressl1= addressl1;
          formData.addressl2= addressl2;
          formData.state= state;
          formData.city= city;
          formData.pincode= pincode;
          formData.name= name;
          formData.designation= designation;
          formData.email= email;
          formData.mobileNumber= mobileNumber;
          formData.panNumber= panNumber;
      formData.gstinOfCompany = gstinOfCompany;
      formData.documentGstCertificate = documentGstCertificate;
          formData.dateOfCompany= dateOfCompany;
          formData.sidmMember= sidmMember;
          formData.sidmMemberShipNumber= sidmMemberShipNumber;
          formData.association= association;
          formData.associationName= associationName;
          formData.registeredOrganization= registeredOrganization;
          formData.nameRegisteredOrganization= nameRegisteredOrganization;
          formData.aboutCompany= aboutCompany;
          formData. sidmChampionAwards= sidmChampionAwards;
      formData.isappreciation = isappreciation;
      formData.appreciationDocuments = appreciationDocuments;
          formData.campareAchivement= campareAchivement;
          formData.mudp= mudp;
      formData.productLink = productLink;
      formData.exhibit1 = exhibit1;
      formData.exhibit2 = exhibit2;
      formData.status = status;
      formData.alterMobileNumber= alterMobileNumber;
      formData.alterEmail= alterEmail
      formData.save((err, success) => {
        if(err){
       res.status(404).json(err);
        }
        else{
          res.status(200).json('successfully sumbit');
        }
      });
    })
    .catch((err) => {
      res.status(404).json(err);

    });
}

 
exports.changeStatus = (req, res, next) => {
  const userID = req.params.userID;
  const status=req.body.status
  const createAt= req.body.createAt
  RegistrationForm.findById(userID).then(data=>{
    if(status==='Approved'){
   data.status=status;
  data.approveDate=createAt
}
  else if(status==='Request Info')
  {
  
    data.status=status
    data.remark=req.body.message ?req.body.message : '';
    data.remarkDate=createAt
  }
  else{
    res.status(404).json('not Found')
  }
   data.save((err, success) => {
    if(err){
   res.status(404).json(err);
    }
    else{
      console.log(success);
      res.status(200).json('successfully status change');
    }
  });
  }).catch(err=>{
    res.status(404).json(err)
  })

}
