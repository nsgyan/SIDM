const Razorpay = require('razorpay');


const RegistrationForm = require("../models/registrationForm");

const PaymentDb = require("../models/paymentSchema");
var instance = new Razorpay({
  key_id: 'rzp_test_partner_EY3aEuNtC4BoNX',
  key_secret: 'gfGVzpQVKiUdLO0v5GuiX8O1',
});


 exports.payNow= async (req,res)=>{
  let amount;
  let currency;
  let receipt ;
  let notes;
    const userID = req.params.userID
    RegistrationForm.findById(userID)
    .then(data=>{
      if(data ){
          if(data.status === 'submit'){
              if(data.typeOfApplicant==='M')
              {
                  if(data.sidmMember==='Yes' && data.sidmMemberShipNumber ){
                amount=25000
                  }
                  else if(data.sidmMember==='No')
                  {
                    amount=35000
                  }
                  else{
                      res.status(404).send("invalid transaction")
                  }
              }
             else if(data.typeOfApplicant==='S')
              {
                  if(data.sidmMember==='Yes' && data.sidmMemberShipNumber ){
                amount=15000
                  }
                  else if(data.sidmMember==='No')
                  {
                    amount=20000
                  }
                  else{
                      res.status(404).send("invalid transaction")
                  }
              }
             else if(data.typeOfApplicant==='L')
              {
                  if(data.sidmMember==='Yes' && data.sidmMemberShipNumber ){
                amount=45000
                  }
                  else if(data.sidmMember==='No')
                  {
                    amount=55000
                  }
                  else{
                      res.status(404).send("invalid transaction")
                  }
              }
              else{
                  res.status(404).send("invalid transaction")
             
              }
              const da = new Date();
               receipt = (da.getMonth() + 1)+""+ da.getDate() +""+ da.getFullYear() +""+ da.getHours() +""+ da.getMinutes()+""+da.getSeconds();
              currency='INR';
             amount = parseFloat(amount)*100;
            
           
             instance.orders.create({
              amount: amount,
              currency: "INR",
              receipt: receipt,
              account_id:'acc_JKo40ascMj3oEP',
              notes: {
                type: data.typeOfApplicant,
                category:data.category,
                panNumber:data.panNumber,
                mobileNumber:data.mobileNumber,
                email: data.email
              }},(err, order) => {
                //STEP 3 & 4:
                if (!err) res.json(order);
                else res.send(err);
              }
            );
         
          }
      }
      else{
        res.status(404).send("invalid transaction")
      }
    })
    .catch(err=>{
      res.status(404).send(err)
    })
}

exports.verifypayment= async (req,res)=>{
  console.log(req.body);
  const { currentDate, razorpay_order_id, razorpay_payment_id,amount} =  req.body;
 
  const userdata=req.body.note
  const payment = new PaymentDb({
    amount:amount,
    typeOfApplicant:userdata.type,
    category:userdata.category,
    createAt: currentDate,
    panNumber:userdata.panNumber,
    mobileNumber:userdata.mobileNumber,
    email: userdata.email,
    razorpay_order_id:razorpay_order_id,
    razorpay_payment_id:razorpay_payment_id,

  })
  payment.save().then(item =>{
    RegistrationForm.findOne({ email: userdata.email, mobileNumber:userdata.mobileNumber, typeOfApplicant:userdata.type, panNumber: userdata.panNumber,category:userdata.category })
    .then((data)=>{
      data.paymentStatus='Done'
      data.paymentId=item._id
      data.save();
    })
   
res.status(200).send(item)
  
  }).catch(err=>{
    res.status(404).send(err)
  })


//   const { razorpay_order_id, razorpay_payment_id,amount} =  req.body;
//   let id=req.body.id
 
//  id=new ObjectId(id)
//   RegistrationForm.findOne({'_id':id}).then(data=>{
//     console.log(data);
//   })
//   .catch(err=>{
//     console.log(err);
//   })
  
  // let hmac = crypto.createHmac("sha256", key_secret);
  //      hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  //       const generated_signature = hmac.digest("hex")
  //       if (razorpay_signature === generated_signature) {
  //       console.log('Payment has been verified')
  //                 //   let pay = new payment_model(req.body);
  //                 //   pay.userid=userId;
  //                 //   pay.amount=(amount>=500?amount*1.1:amount);
  //                 //   pay.transationid = razorpay_payment_id;
  //                 //   pay.transation_status="settlement"
  //                 //   pay.pay_status="deposit"
  //                 //   pay.save();
  //                 // res.json({ success: true, message: "Payment has been verified" });
  //               } else res.json({ success: false, message: "Payment verification failed" });


}

