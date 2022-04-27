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
          if(data.status === 'approve'){
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
          else{
            res.status(404).send("invalid transaction")
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
  const { createAt, razorpay_order_id, razorpay_payment_id,amount} =  req.body;
 
  const userdata=req.body.note
  const payment = new PaymentDb({
    amount:amount/100,
    typeOfApplicant:userdata.type,
    category:userdata.category,
    createAt: createAt,
    panNumber:userdata.panNumber,
    mobileNumber:userdata.mobileNumber,
    email: userdata.email,
    razorpay_order_id:razorpay_order_id,
    razorpay_payment_id:razorpay_payment_id,

  })
  payment.save().then(item =>{
    RegistrationForm.findOne({ email: userdata.email, mobileNumber:userdata.mobileNumber, typeOfApplicant:userdata.type, panNumber: userdata.panNumber,category:userdata.category })
    .then((data)=>{
      data.paymentStatus='Paid'
      data.paymentId=item._id
      data.save();
    })
   
res.status(200).send(item)
  
  }).catch(err=>{
    res.status(404).send(err)
  })

}

exports.viewpayment= async (req,res)=>{
  const userID = req.params.userID
  PaymentDb.findById(userID).then(data=>{
    res.status(200).send(data)
  }).catch(err=>{
    res.status(404).send(err)
  })
}


