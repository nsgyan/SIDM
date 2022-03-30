const RegistrationForm = require('../models/registrationForm')

exports.postRegistrationForm = (req, res, next) => {



    const category = req.body.category;
    const typeOfApplicant = req.body.typeOfApplicant;
    const nameOfOrganisation = req.body.nameOfOrganisation;
    const cin = req.body.cin;
    const udhyogAadharNumber = req.body.udhyogAadharNumber;
    const dippNumber = req.body.dippNumber;
    const adhaarNumber = req.body.adhaarNumber
    const sidmMemberShipNumber = req.body.sidmMemberShipNumber;
    const otherAssociationMemberShipNumber = req.body.otherAssociationMemberShipNumber;
    const organizationsAddress = req.body.organizationsAddress;
    const contactName = req.body.contactName;
    const designation = req.body.designation;
    const mobileNumber = req.body.mobileNumber;
    const email = req.body.email;
    const panNumber = req.body.panNumber;
    const gstin = req.body.gstin;
    const dateOfCompany = req.body.dateOfCompany;
    const scanDocumentUrl = req.body.scanDocumentUrl;
    const userAwardedByOrganization = req.body.userAwardedByOrganization;
    const aboutCompany = req.body.aboutCompany;
    const achievementsToJustifyApplication = req.body.achievementsToJustifyApplication;
    const appreciationDocumentsUrl = req.body.appreciationDocumentsUrl;
    const campareAchivement = req.body.campareAchivement;
    const documentsOfProductUrl = req.body.documentsOfProductUrl
    const companyPhotographUrl = req.body.companyPhotographUrl

    const form = new RegistrationForm({
        category: category,
        typeOfApplicant: typeOfApplicant,
        nameOfOrganisation: nameOfOrganisation,
        cin: cin,
        udhyogAadharNumber: udhyogAadharNumber,
        dippNumber: dippNumber,
        adhaarNumber: adhaarNumber,
        sidmMemberShipNumber: sidmMemberShipNumber,
        otherAssociationMemberShipNumber: otherAssociationMemberShipNumber,
        organizationsAddress: organizationsAddress,
        contactName: contactName,
        designation: designation,
        mobileNumber: mobileNumber,
        email: email,
        panNumber: panNumber,
        gstin: gstin,
        dateOfCompany: dateOfCompany,
        scanDocumentUrl: scanDocumentUrl,
        userAwardedByOrganization: userAwardedByOrganization,
        aboutCompany: aboutCompany,
        achievementsToJustifyApplication: achievementsToJustifyApplication,
        appreciationDocumentsUrl: appreciationDocumentsUrl,
        campareAchivement: campareAchivement,
        documentsOfProductUrl: documentsOfProductUrl,
        companyPhotographUrl: companyPhotographUrl

    })
    form.save()
        .then(result => {
            console.log('done', result);
        }).catch(err => {
            console.log(err);

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