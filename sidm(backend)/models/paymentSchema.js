const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paymentSchema=  new Schema({
    currentDate:{type:String},
    category:{type:String},
    amount:{type:Number},
    typeOfApplicant:{type:String},
    panNumber:{type:String,
        uppercase: true },
    mobileNumber:{type:Number},
    email: {type:String,  lowercase: true },
    razorpay_order_id:{type:String},
    razorpay_payment_id:{type:String},
})
module.exports = mongoose.model('paymentSchema', paymentSchema);