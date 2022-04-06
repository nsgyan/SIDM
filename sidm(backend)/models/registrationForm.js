const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RegistrationFormSchema = new Schema({
    status: { type: String },
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
    email: {
        type: String,
        lowercase: true
    },
    sidmMemberShipNumber: { type: String },
    otherAssociationMemberShipNumber: { type: String },
    panNumberOfOrganization: {
        type: String,
        lowercase: true
    },
    gstinOfOrganization: { type: String },
    dateOfOrganization: { type: String },
    vendorOrganization1: { type: String },
    vendorOrganization2: { type: String },
    vendorOrganization3: { type: String },
    vendorOrganization4: { type: String },
    aboutCompany: { type: String },
    achievementsToJustifyApplication: { type: String },
    campareAchivement: { type: String },
    documentGstCertificate: { type: String },
    documentsOfProduct: { type: String },
    appreciationDocuments: { type: String },
    briefCompany: { type: String }
})

module.exports = mongoose.model('RegistrationForm', RegistrationFormSchema);