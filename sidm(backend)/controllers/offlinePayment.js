
const PaymentDb = require("../models/offlinePayment");
const RegistrationForm = require("../models/registrationForm");

 exports.postPaymentDetails=(req,res)=>{
   
    const  registrationId=req.body.registrationId
    const  dateOfPayment=req.body.dateOfPayment
    const  amount=req.body.amount
    const  transactionDetails=req.body.transactionDetails
    const  modeOfPayment=req.body.modeOfPayment
    const  nameOfBank=req.body.nameOfBank
     const payment = new PaymentDb({
    amount:amount,
    registrationId:registrationId,
    dateOfPayment:dateOfPayment,
    transactionDetails:transactionDetails,
    modeOfPayment:modeOfPayment,
    nameOfBank:nameOfBank,
  })
  RegistrationForm.findById(registrationId).then(data=>{
      if(data){
          payment.save().then(item=>{
            data.offlinePaymentDetails=item._id
            data.memberShipAmount=item.amount
            data.save()
            res.status(202).json("Payment Details Successfuly save")
          })
      }
      else{
        res.status(401).json("Registration Form Not Found")
      }

  }).catch(err=>{
    res.status(401).json("Server Unable to understand request")
  })
 }

 exports.getPaymentDetails=(req,res)=>{
    const  offlinePaymentDetails= req.params.userID;
    PaymentDb.findById(offlinePaymentDetails).then(data=>{
      if(data){
        res.status(200).json(data)
      }
      else{
        res.status(401).json("Payment Details Not Found")
      }

  }).catch(err=>{
    console.log(err);
    res.status(401).json("Server Unable to understand request")
  })
 }