const RegistrationForm = require('../models/registrationForm')

exports.postRegistrationForm = (req, res, next) => {


    const category = {
        type: req.body.category,
        typeOfApplicant: req.body.typeOfApplicant,
        sidmMemberShipNumber: req.body.sidmMemberShipNumber,
        otherAssociationMemberShipNumber: req.body.otherAssociationMemberShipNumber,
        gstinOfOrganization: req.body.gstinOfOrganization,
        dateOfOrganization: req.body.dateOfOrganization,
        financialStatement1: req.body.financialStatement1,
        financialStatement2: req.body.financialStatement2,
        financialStatement3: req.body.financialStatement3,
        aboutCompany: req.body.aboutCompany,
        achievementsToJustifyApplication: req.body.achievementsToJustifyApplication,
        campareAchivement: req.body.compareAchivement,
        documentsOfProduct: req.body.documentsOfProduct,
        appreciationDocuments: req.body.appreciationDocuments,
        briefCompany: req.body.briefCompany,
    }
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
    const documentGstCertificate = req.body.documentGstCertificate;
    const panNumberOfOrganization = req.body.panNumberOfOrganization;

    const form = new RegistrationForm({
        category: category,
        addressl1: addressl1,
        addressl2: addressl2,
        state: state,
        city: city,
        pincode: pincode,
        name: name,
        designation: designation,
        mobileNumber: mobileNumber,
        email: email,
        nameOfOrganisation: nameOfOrganisation,
        documentGstCertificate: documentGstCertificate,
        panNumberOfOrganization: panNumberOfOrganization,
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
    const email = req.body.email;
    const mobileNumber = req.body.mobileNumber;
    const panNumber = req.body.panNumber
    console.log(req.body);
    RegistrationForm.findOne({ mobileNumber: mobileNumber, email: email, panNumberOfOrganization: panNumber })
        .then(data => {
            if (data) {

                res.status(200).send(data)
            }
            else {
                res.status(404).send('not Found user Data')
            }
        }).catch(err => {
            res.status(404).send('not Found')
        })

}

exports.getmemberData = (req, res, next) => {
    const memberId = req.params.memberId;
    console.log(memberId);
    RegistrationForm.findById(memberId)
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