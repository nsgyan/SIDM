const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RegistrationFormSchema = new Schema({
    category: { type: String },
    typeOfApplicant: { type: String },
    nameOfOrganisation: { type: String },
    addressl1: { type: String },
    addressl2: { type: String },
    state: { type: String },
    city: { type: String },
    pincode: { type: String },
    name: { type: String },
    designation: { type: String },
    mobileNumber: { type: String },
    email: { type: String },
    sidmMemberShipNumber: { type: String },
    otherAssociationMemberShipNumber: { type: String },
    panNumberOfOrganization: { type: String },
    gstinOfOrganization: { type: String },
    dateOfOrganization: { type: String },
    financialStatement1: { type: String },
    financialStatement2: { type: String },
    financialStatement3: { type: String },
    aboutCompany: { type: String },
    achievementsToJustifyApplication: { type: String },
    campareAchivement: { type: String },
    documentGstCertificate: { type: String },
    documentsOfProduct: { type: String },
    appreciationDocuments: { type: String },
    briefCompany: { type: String }
})

module.exports = mongoose.model('RegistrationForm', RegistrationFormSchema);