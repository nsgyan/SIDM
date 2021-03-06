const RegistrationForm = require("../models/registrationForm");
const fs = require("fs");
var nodemailer = require('nodemailer');
const path = require('path')
var handlebars = require('handlebars');
const date = require('date-and-time')


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
  const nomenclaturOfItems = req.body.nomenclaturOfItems;
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
  const alterEmail= req.body.alterEmail;
  const nameOfBank = req.body.nameOfBank;
  const offlineDateOfPayment = req.body.offlineDateOfPayment;
  const transactionDetails = req.body.transactionDetails;
  const amount = req.body.amount;
 const paymentMode= req.body.paymentMode;
  const offlineModeOfPayment= req.body.offlineModeOfPayment
  let paymentStatus=null
  if(paymentMode==='offline'&&status==='Pending Approval'){
    paymentStatus='Paid'
  }
  const form = new RegistrationForm({
    category: category,
    typeOfApplicant: typeOfApplicant,
    paymentStatus:paymentStatus,
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
    nomenclaturOfItems:nomenclaturOfItems,
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
    nameOfBank :nameOfBank,
    offlineDateOfPayment :offlineDateOfPayment,
    transactionDetails :transactionDetails,
    amount :amount,
   paymentMode:paymentMode,
    offlineModeOfPayment:offlineModeOfPayment,
    remark:null
  });

 
  form
    .save()
    .then((result) => {
      if(result.status==='Pending')
     {  const Date= date.format(result.createAt,'YYYY/MM/DD HH:mm');
      const filePath = path.join(__dirname, '../view/email.html');
      const source = fs.readFileSync(filePath, 'utf-8').toString();
      const template = handlebars.compile(source);
      if (data.category === 'cat1') {
        data.category = 'C1- Technology /  Product Innovation to address Defence Capability Gaps'
      }
      else if (data.category === 'cat2') {
        data.category = 'C2-Import Substitution for Mission Critical Parts / Sub-Systems / Systems'
      }
      else if (data.category === 'cat3') {
        data.category = 'C3-  Creation of   Niche, Technological Capability for Design, Manufacturing or Testing'
      }
      else if (data.category === 'cat4') {
        data.category = 'C4- Export Performance of Defence & Aerospace Products'
      }
      const replacements = {
        typeOfApplicant:result.typeOfApplicant,
        category: result.category,
        companyName:result.nameOfCompany,
        email: result.email,
        mobileNumber:result.mobileNumber,
        PanNumber:result.panNumber,
        date:Date,
        nomenclaturOfItems:data.nomenclaturOfItems

      };
      var maillist = [
        result.email,
        result.alterEmail,
        'bharat.jain@sidm.in',
        'awards22@sidm.in',
        'vikas.rai@sidm.in',
        'manoj.mishra@sidm.in'
         

      ];
      
      maillist.toString();
      const htmlToSend = template(replacements);
      var mailOptions = {
        from: 'awardsidm@gmail.com',
        to: maillist,
        subject: 'SIDM Champion Awards 2022',
        html: htmlToSend
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.json(error);
        } else {
          res.status(200).json('Please check your email');
        }
      });}
      else if(result.status==='Pending Approval')
      {
        const Date= date.format(result.createAt,'YYYY/MM/DD HH:mm');
        const filePath = path.join(__dirname, '../view/finalEmail.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        if (data.category === 'cat1') {
          data.category = 'C1- Technology /  Product Innovation to address Defence Capability Gaps'
        }
        else if (data.category === 'cat2') {
          data.category = 'C2-Import Substitution for Mission Critical Parts / Sub-Systems / Systems'
        }
        else if (data.category === 'cat3') {
          data.category = 'C3-  Creation of   Niche, Technological Capability for Design, Manufacturing or Testing'
        }
        else if (data.category === 'cat4') {
          data.category = 'C4- Export Performance of Defence & Aerospace Products'
        }
        const replacements = {
          typeOfApplicant:result.typeOfApplicant,
          category: result.category,
          companyName:result.nameOfCompany,
          email: result.email,
          mobileNumber:result.mobileNumber,
          PanNumber:result.panNumber,
          date:Date,
          nomenclaturOfItems:data.nomenclaturOfItems
  
        };
        var maillist = [
          result.email,
          result.alterEmail,
          'bharat.jain@sidm.in',
        'awards22@sidm.in',
        'vikas.rai@sidm.in',
        'manoj.mishra@sidm.in'
          
           
        ];
        
        maillist.toString();
        const htmlToSend = template(replacements);
        var mailOptions = {
          from: 'awardsidm@gmail.com',
          to: maillist,
          subject: 'SIDM Champion Awards 2022',
          html: htmlToSend
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            res.json(error);
          } else {
            res.status(200).json('Please check your email');
          }
        })
      }
  if(status==='Pending Approval'){
      res.status(200).json({message:'successfully Submitted',
    id:result._id});}
      else{
        res.status(200).json({message:'successfully Submitted'});
      }
    })
    .catch((err) => {
      res.json("internal server error");
    });
};

exports.getForms = (req, res, next) => {
  const page = req.query.page || 1;
  const itemPerPage = req.query.itemPerPage || 10;
  let totalItems;
  RegistrationForm.find().sort({"createAt": -1})
    .then((data) => {
      if (data) {
        res.status(200).json({ data });
      } else {
        res.status(401).json("not Found");
      }
    })
    .catch((err) => {
      res.json("internal server error");
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
        res.status(401).json("not Found user Data");
      }
    })
    .catch((err) => {
      res.status(401).json("not Found");
    });
};

exports.getmemberData = (req, res, next) => {
  const memberId = req.params.memberId;
  RegistrationForm.findById(memberId)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(401).json("not Found");
      }
    })
    .catch((err) => {
      res.json("internal server error");
    });
};

exports.updateFrom = (req, res, next) => {
  const usertype=req.body.userType ?req.body.userType:''; 
  const userID = req.params.userID;
  const updatedAt=new Date();
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
  const nomenclaturOfItems = req.body.nomenclaturOfItems;
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
  const alterEmail= req.body.alterEmail;
  const nameOfBank = req.body.nameOfBank;
  const offlineDateOfPayment = req.body.offlineDateOfPayment;
  const transactionDetails = req.body.transactionDetails;
  const amount = req.body.amount;
 const paymentMode= req.body.paymentMode;
  const offlineModeOfPayment= req.body.offlineModeOfPayment
  let paymentStatus
  if(paymentMode==='offline'&&status==='Pending Approval'){
    paymentStatus='Paid'
  }
  RegistrationForm.findById(userID)
    .then((formData) => {
    if(formData.status!=='Approved'||usertype==='admin')
    {  
          formData.typeOfApplicant= typeOfApplicant;
          if (subCategoryDoccument !== formData.subCategoryDoccument) {
            formData.subCategoryDoccument = subCategoryDoccument;
          }
          if (financialDoccument !== formData.financialDoccument) {
            formData.financialDoccument = financialDoccument;
          }
          
          formData.updatedAt=updatedAt
          if(paymentMode==='offline'&&status==='Pending Approval'){
            formData.paymentStatus=paymentStatus
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
          formData.nomenclaturOfItems= nomenclaturOfItems;
          formData.sidmChampionAwards= sidmChampionAwards;
      formData.isappreciation = isappreciation;
      formData.appreciationDocuments = appreciationDocuments;
          formData.campareAchivement= campareAchivement;
          formData.mudp= mudp;
          formData.nameOfBank =nameOfBank,
          formData.offlineDateOfPayment =offlineDateOfPayment,
          formData.transactionDetails =transactionDetails,
          formData.amount =amount,
          formData.paymentMode=paymentMode,
          formData.offlineModeOfPayment=offlineModeOfPayment,
      formData.productLink = productLink;
      formData.exhibit1 = exhibit1;
      formData.exhibit2 = exhibit2;
      formData.status = status;
      formData.alterMobileNumber= alterMobileNumber;
      formData.alterEmail= alterEmail
      formData.save((err, success) => {
        if(err){
          res.json("internal server error");
        }
        else{
          res.status(200).json({message:'successfully Submitted',
          id:success._id});
        
        }
      });}
      else
      {
        res.status(401).json('user cannot update form');

      }
    })
    .catch((err) => {
      res.json("internal server error");

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
    res.status(401).json('not Found')
  }
   data.save((err, success) => {
    if(err){
      res.json("internal server error");
    }
    else{
     if(success.status==='Approved'){
      const filePath = path.join(__dirname, '../view/registrationApproval.html');
      const source = fs.readFileSync(filePath, 'utf-8').toString();
      const template = handlebars.compile(source);
  
      var maillist = [
        success.email,
        success.alterEmail,
        'bharat.jain@sidm.in',
        'awards22@sidm.in',
        'vikas.rai@sidm.in',
        'manoj.mishra@sidm.in'
         

      ];
      if (data.category === 'cat1') {
        data.category = 'C1- Technology /  Product Innovation to address Defence Capability Gaps'
      }
      else if (data.category === 'cat2') {
        data.category = 'C2-Import Substitution for Mission Critical Parts / Sub-Systems / Systems'
      }
      else if (data.category === 'cat3') {
        data.category = 'C3-  Creation of   Niche, Technological Capability for Design, Manufacturing or Testing'
      }
      else if (data.category === 'cat4') {
        data.category = 'C4- Export Performance of Defence & Aerospace Products'
      }
      const replacements = {
        typeOfApplicant:success.typeOfApplicant,
        category: success.category,
        companyName:success.nameOfCompany,
        date:new Date(),
        nomenclaturOfItems:data.nomenclaturOfItems

      };
      
      maillist.toString();
      const htmlToSend = template(replacements);
      var mailOptions = {
        from: 'awardsidm@gmail.com',
        to: maillist,
        subject: 'SIDM Champion Awards 2022',
        html: htmlToSend
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.json(error);
        } else {
          res.status(200).json('Please check your email');
        }
      })
     }
      res.status(200).json('successfully status change');
    }
  });
  }).catch(err=>{
    res.json("internal server error");
  })

}
