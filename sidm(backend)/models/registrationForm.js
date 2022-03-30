const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RegistrationFormSchema = new Schema({
    category: { type: String },
    typeOfApplicant: { type: String },
    nameOfOrganisation: { type: String },
    cin: { type: String },
    udhyogAadharNumber: { type: String },
    dippNumber: { type: String },
    adhaarNumber: { type: String },
    sidmMemberShipNumber: { type: String },
    otherAssociationMemberShipNumber: { type: String },
    organizationsAddress: { type: String },
    contactName: { type: String },
    designation: { type: String },
    mobileNumber: { type: Number },
    email: { type: String },
    panNumber: { type: String },
    gstin: { type: String },
    dateOfCompany: { type: String },
    scanDocumentUrl: { type: String },
    userAwardedByOrganization: { type: String },
    aboutCompany: { type: String },
    achievementsToJustifyApplication: { type: String },
    appreciationDocumentsUrl: { type: String },
    campareAchivement: { type: String },
    documentsOfProductUrl: { type: String },
    companyPhotographUrl: { type: String }
})

module.exports = mongoose.model('RegistrationForm', RegistrationFormSchema);