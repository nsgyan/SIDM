const registrationForm = require('../models/registrationForm');
const RegistrationForm = require('../models/registrationForm')
const fs = require('fs')

exports.postRegistrationForm = (req, res, next) => {
    const createAt = req.body.createAt
    const status = req.body.status
    const category = req.body.category;
    const typeOfApplicant = req.body.typeOfApplicant;
    const sidmMemberShipNumber = req.body.sidmMemberShipNumber;
    const otherAssociationMemberShipNumber = req.body.otherAssociationMemberShipNumber;
    const gstinOfOrganization = req.body.gstinOfOrganization;
    const dateOfOrganization = req.body.dateOfOrganization;
    const vendorOrganization1 = req.body.vendorOrganization1;
    const vendorOrganization2 = req.body.vendorOrganization2;
    const vendorOrganization3 = req.body.vendorOrganization3;
    const vendorOrganization4 = req.body.vendorOrganization4;
    const aboutCompany = req.body.aboutCompany;
    const achievementsToJustifyApplication = req.body.achievementsToJustifyApplication;
    const campareAchivement = req.body.campareAchivement;
    const documentsOfProduct = req.body.documentsOfProduct;
    const appreciationDocuments = req.body.appreciationDocuments;
    const briefCompany = req.body.briefCompany;
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
    const awardMatterToCompany = req.body.awardMatterToCompany;
    const sidmMember = req.body.sidmMember
    const otherMember = req.body.otherMember
    const vendorOrganization = req.body.vendorOrganization
    const isappreciation = req.body.isappreciation



                const form = new RegistrationForm({
                    createAt: createAt,
                    status: status,
                    category: category,
                    typeOfApplicant: typeOfApplicant,
                    sidmMemberShipNumber: sidmMemberShipNumber,
                    otherAssociationMemberShipNumber: otherAssociationMemberShipNumber,
                    gstinOfOrganization: gstinOfOrganization,
                    dateOfOrganization: dateOfOrganization,
                    vendorOrganization1: vendorOrganization1,
                    vendorOrganization2: vendorOrganization2,
                    vendorOrganization3: vendorOrganization3,
                    vendorOrganization4: vendorOrganization4,
                    aboutCompany: aboutCompany,
                    achievementsToJustifyApplication: achievementsToJustifyApplication,
                    campareAchivement: campareAchivement,
                    documentsOfProduct: documentsOfProduct,
                    appreciationDocuments: appreciationDocuments,
                    briefCompany: briefCompany,
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
                    awardMatterToCompany: awardMatterToCompany,
                    sidmMember: sidmMember,
                    otherMember: otherMember,
                    vendorOrganization: vendorOrganization,
                    isappreciation: isappreciation,
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
    const page = req.query.page || 1;
    const itemPerPage = req.query.itemPerPage || 10;
    console.log(req.query);
    let totalItems;
    RegistrationForm.find().countDocuments().then(numOfForm => {
        totalItems = numOfForm;
        // totalItems = numO
        // console.log(numofForms);
        return RegistrationForm.find()
            .skip((page - 1) * itemPerPage)
            .limit(itemPerPage)
    })
        .then(data => {
            console.log(data);
            if (data) {
                res.status(200).send({
                    forms: data,
                    currentPage: page,
                    hasNextPage: itemPerPage * page < totalItems,
                    hasPreviousPage: page > 1,
                    nextPage: page + 1,
                    previousPage: page - 1,
                    lastPage: Math.ceil(totalItems / itemPerPage)


                })
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

exports.updateFrom = (req, res, next) => {
    console.log('hello');
    const userID = req.params.userID;
    const status = req.body.status
    const typeOfApplicant = req.body.typeOfApplicant;
    const sidmMemberShipNumber = req.body.sidmMemberShipNumber;
    const otherAssociationMemberShipNumber = req.body.otherAssociationMemberShipNumber;
    const gstinOfOrganization = req.body.gstinOfOrganization;
    const dateOfOrganization = req.body.dateOfOrganization;
    const vendorOrganization1 = req.body.vendorOrganization1;
    const vendorOrganization2 = req.body.vendorOrganization2;
    const vendorOrganization3 = req.body.vendorOrganization3;
    const vendorOrganization4 = req.body.vendorOrganization4;
    const aboutCompany = req.body.aboutCompany;
    const achievementsToJustifyApplication = req.body.achievementsToJustifyApplication;
    const campareAchivement = req.body.campareAchivement;
    const documentsOfProduct = req.body.documentsOfProduct;
    const appreciationDocuments = req.body.appreciationDocuments;
    const briefCompany = req.body.briefCompany;
    const updateNameOfOrganisation = req.body.nameOfOrganisation;
    const updateAddressl1 = req.body.addressl1;
    const updateAddressl2 = req.body.addressl2;
    const updateState = req.body.state;
    const updateCity = req.body.city;
    const awardMatterToCompany = req.body.awardMatterToCompany
    const updatePincode = req.body.pincode;
    const updateName = req.body.name;
    const updateDesignation = req.body.designation;
    const sidmMember = req.body.sidmMember
    const otherMember = req.body.otherMember
    const vendorOrganization = req.body.vendorOrganization
    const isappreciation = req.body.isappreciation
    console.log(appreciationDocuments);
    console.log(campareAchivement, 'desf');
    const updateDocumentGstCertificate = req.body.documentGstCertificate;
    RegistrationForm.findById(userID).then(formData => {
        formData.nameOfOrganisation = updateNameOfOrganisation;
        formData.addressl1 = updateAddressl1;
        formData.addressl2 = updateAddressl2;
        formData.state = updateState;
        formData.city = updateCity;
        formData.pincode = updatePincode;
        formData.name = updateName;
        formData.designation = updateDesignation;
        if (updateDocumentGstCertificate !== formData.documentGstCertificate) {
            formData.documentGstCertificate = updateDocumentGstCertificate
        }
        formData.status = status
        formData.typeOfApplicant = typeOfApplicant;
        formData.sidmMemberShipNumber = sidmMemberShipNumber;
        formData.otherAssociationMemberShipNumber = otherAssociationMemberShipNumber;
        formData.gstinOfOrganization = gstinOfOrganization;
        formData.awardMatterToCompany = awardMatterToCompany
        formData.dateOfOrganization = dateOfOrganization;
        formData.vendorOrganization1 = vendorOrganization1;
        formData.vendorOrganization2 = vendorOrganization2;
        formData.vendorOrganization3 = vendorOrganization3;
        formData.vendorOrganization4 = vendorOrganization4;
        formData.sidmMember = sidmMember;
        formData.otherMember = otherMember;
        formData.vendorOrganization = vendorOrganization;
        formData.isappreciation = isappreciation;

        formData.aboutCompany = aboutCompany;
        formData.achievementsToJustifyApplication = achievementsToJustifyApplication;
        if (documentsOfProduct !== formData.documentsOfProduct) {
            formData.documentsOfProduct = documentsOfProduct;
        }
        formData.campareAchivement = campareAchivement;
        if (appreciationDocuments !== formData.appreciationDocuments) {
            formData.appreciationDocuments = appreciationDocuments;
        }

        formData.briefCompany = briefCompany;
        formData.save((err, success) => {
            console.log(err, 'err');
            res.status(200).send(success)

        })
    })
        .catch(err => {
            console.log(err);
        })

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
