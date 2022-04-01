const RegistrationForm = require('../models/registrationForm')

exports.postRegistrationForm = (req, res, next) => {


    const category = req.body.category;
    const typeOfApplicant = req.body.typeOfApplicant;
    const nameOfOrganisation = req.body.nameOfOrganisation;
    const addressl1 = req.body.addressl1;
    const addressl2 = req.body.addressl2;
    const state = req.body.state;
    const city = req.body.city;
    const pincode = req.body.pincode;
    const name = req.body.name;
    const designation = req.body.designation;
    const mobileNumber = req.body.mobileNumber;
    const email = req.body.email;
    const sidmMemberShipNumber = req.body.sidmMemberShipNumber;
    const otherAssociationMemberShipNumber = req.body.otherAssociationMemberShipNumber;
    const panNumberOfOrganization = req.body.panNumberOfOrganization;
    const gstinOfOrganization = req.body.gstinOfOrganization;
    const dateOfOrganization = req.body.dateOfOrganization;
    const financialStatement1 = req.body.financialStatement1;
    const financialStatement2 = req.body.financialStatement2;
    const financialStatement3 = req.body.financialStatement3;
    const aboutCompany = req.body.aboutCompany;
    const achievementsToJustifyApplication = req.body.achievementsToJustifyApplication;
    const campareAchivement = req.body.compareAchivement;
    const documentGstCertificate = req.body.documentGstCertificate;
    const documentsOfProduct = req.body.documentsOfProduct;
    const appreciationDocuments = req.body.appreciationDocuments;
    const briefCompany = req.body.briefCompany
    const form = new RegistrationForm({
        category: category,
        typeOfApplicant: typeOfApplicant,
        nameOfOrganisation: nameOfOrganisation,
        sidmMemberShipNumber: sidmMemberShipNumber,
        otherAssociationMemberShipNumber: otherAssociationMemberShipNumber,
        name: name,
        designation: designation,
        mobileNumber: mobileNumber,
        email: email,
        panNumberOfOrganization: panNumberOfOrganization,
        gstinOfOrganization: gstinOfOrganization,
        aboutCompany: aboutCompany,
        achievementsToJustifyApplication: achievementsToJustifyApplication,
        campareAchivement: campareAchivement,
        addressl1: addressl1,
        addressl2: addressl2,
        state: state,
        city: city,
        pincode: pincode,
        dateOfOrganization: dateOfOrganization,
        financialStatement1: financialStatement1,
        financialStatement2: financialStatement2,
        financialStatement3: financialStatement3,
        documentGstCertificate: documentGstCertificate,
        documentsOfProduct: documentsOfProduct,
        appreciationDocuments: appreciationDocuments,
        briefCompany: briefCompany

    })
    form.save()
        .then(result => {
            res.status(200).send(result)
            console.log(result);
        }).catch(err => {

            res.send(err)
        })

}


exports.getForms = (req, res, next) => {
    RegistrationForm.find()
        .then(data => {
            if (data) {
                res.status(200).send(data)
            }
            else {
                res.status(404).send('not Found')
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getUserData = (req, res, next) => {
    const userID = req.params.userId;
    console.log(userID);
    RegistrationForm.findById(userID)
        .then(data => {
            if (data) {
                res.status(200).send(data)
            }
            else {
                res.status(404).send('not Found')
            }
        }).catch(err => {
            res.status(404).send('not Found')
        })

}












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