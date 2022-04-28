const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const offlinePaymentSchema=  new Schema({
    createAt:{type:String,default:new Date()},
    registrationId:{type:String,unique:true},
    dateOfPayment:{type:String},
    amount:{type:String},
    transactionDetails:{type:String},
    modeOfPayment:{type:String},
    nameOfBank:{type:String},
})
module.exports = mongoose.model('offlinePaymentSchema', offlinePaymentSchema);