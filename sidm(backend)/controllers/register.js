const RegistrationForm = require("../models/registrationForm");
const fs = require("fs");

exports.postRegistrationForm = (req, res, next) => {

  const createAt = req.body.currentDate;
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
    createAt: createAt,
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
        alterEmail:alterEmail
  });
  form
    .save()
    .then((result) => {
      res.status(200).send(result);
      console.log(result);
    })
    .catch((err) => {
       res.send(err);
      console.log(err);
    });
};

exports.getForms = (req, res, next) => {
  const page = req.query.page || 1;
  const itemPerPage = req.query.itemPerPage || 10;
  console.log(req.query);
  let totalItems;
  RegistrationForm.find()
    .countDocuments()
    .then((numOfForm) => {
      totalItems = numOfForm;
      // totalItems = numO
      // console.log(numofForms);
      return RegistrationForm.find()
        .skip((page - 1) * itemPerPage)
        .limit(itemPerPage);
    })
    .then((data) => {
      console.log(data);
      if (data) {
        res.status(200).send({
          forms: data,
          currentPage: page,
          hasNextPage: itemPerPage * page < totalItems,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: Math.ceil(totalItems / itemPerPage),
        });
      } else {
        res.status(404).send("not Found");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUserData = (req, res, next) => {
  const email = req.body.email;
  const mobileNumber = req.body.mobileNumber;
  const panNumber = req.body.panNumber;
  console.log(req.body);
  RegistrationForm.findOne({
    mobileNumber: mobileNumber,
    email: email,
    panNumberOfOrganization: panNumber,
  })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send("not Found user Data");
      }
    })
    .catch((err) => {
      res.status(404).send("not Found");
    });
};

exports.getmemberData = (req, res, next) => {
  const memberId = req.params.memberId;
  console.log(memberId);
  RegistrationForm.findById(memberId)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send("not Found");
      }
    })
    .catch((err) => {
      res.status(404).send("not Found");
    });
};

exports.updateFrom = (req, res, next) => {
  const userID = req.params.userID
  console.log(userID);
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
  const status = req.body.type;
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
        console.log(err, "err");
        res.status(200).send(success);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

  // RegistrationForm.findById(userID)
  //     .then(formData => {
  //         formData.nameOfOrganisation = updateNameOfOrganisation;
  //         formData.addressl1 = updateAddressl1;
  //         formData.addressl2 = updateAddressl2;
  //         formData.state = updateState;
  //         formData.city = updateCity;
  //         formData.pincode = updatePincode;
  //         formData.name = updateName;
  //         formData.designation = updateDesignation;
  //         if (updateDocumentGstCertificate) {
  //             formData.documentGstCertificate = updateDocumentGstCertificate
  //         }
  //         formData.typeOfApplicant = typeOfApplicant;
  //         formData.sidmMemberShipNumber = sidmMemberShipNumber;
  //         formData.otherAssociationMemberShipNumber = otherAssociationMemberShipNumber;
  //         formData.gstinOfOrganization = gstinOfOrganization;
  //         formData.dateOfOrganization = dateOfOrganization;
  //         formData.vendorOrganization1 = vendorOrganization1;
  //         formData.vendorOrganization2 = vendorOrganization2;
  //         formData.vendorOrganization3 = vendorOrganization3;
  //         formData.aboutCompany = aboutCompany;
  //         formData.achievementsToJustifyApplication = achievementsToJustifyApplication;
  //         if (documentsOfProduct) {
  //             formData.documentsOfProduct = documentsOfProduct;
  //         }
  //         formData.campareAchivement = compareAchivement;
  //         if (appreciationDocuments) {
  //             formData.appreciationDocuments = appreciationDocuments;
  //         }

  //         formData.briefCompany = briefCompany;
  //         formData.save().then(result => {
  //             console.log('sdj');
  //             console.log(result, 'wertt543');
  //         })
  //             .catch(err => {
  //                 console.log(err, 'err');
  //             })
  //     })
  //     .then(result => {
  //         console.log(result, 'sdfdg');
  //         // res.status(200).send(result)
  //     })
  //     .catch(error => {
  //         // res.status(404).send(error)
  //     })

// const multer  = require('multer');
// const fileStroage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//       cb(null, "public/uploadForm");
//     },
//     filename: (req, file, cb) =>{
//         // console.log(file);
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
//   });
// const upload = multer({ storage:fileStroage });

// router.post('/uploadImage', upload.single('uploadForm'), (req, res) => {
//     res.send(req.file)
//   }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
//   });
