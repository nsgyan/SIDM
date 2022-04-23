const Razorpay = require('razorpay');
const RegistrationForm = require("../models/registrationForm");

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
    await   RegistrationForm.findById(userID)
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
            
             notes=data;
         
          }
      }
      else{
        res.status(404).send("invalid transaction")
      }
    })
    .catch(err=>{
        console.log(err)
    })
    instance.orders.create(
        { amount, currency, receipt, notes },
        (err, order) => {
          //STEP 3 & 4:
          if (!err) res.json(order);
          else res.send(err);
        }
      );


}


// authController.paymentSave = function (req, res) {
//     var user = req.session.user,
//       userId = req.session.userId;
//     if (userId == null) {
//       res.render("../views/login");
//     } else {
//       if (req.body.amount != "") {
//           const da = new Date();
//           let receipt = (da.getMonth() + 1)+""+ da.getDate() +""+ da.getFullYear() +""+ da.getHours() +""+ da.getMinutes()+""+da.getSeconds();
//           req.body.currency='INR';
//           req.body.amount = parseFloat(req.body.amount)*100;
//           // req.body.receipt = '';
//           req.body.notes=user;
//            const { amount, currency, notes } = req.body;
  
//            // STEP 2:
//            razorpayInstance.orders.create(
//              { amount, currency, receipt, notes },
//              (err, order) => {
//                //STEP 3 & 4:
//                if (!err) res.json(order);
//                else res.send(err);
//              }
//            );
//       } else {
//         req.flash("toast_error", "Sorry! Something Went wrong.");
//         res.redirect("/payment");
//       }
//     }
//   };
  
//   authController.verifypayment=function(req,res){
//        var user = req.session.user,
//          userId = req.session.userId;
//       const { razorpay_order_id, razorpay_payment_id, razorpay_signature , amount} =  req.body;
//       const key_secret = 'NeYevC8pUOpBYpbdTmoAzwuK';
  
//       let hmac = crypto.createHmac("sha256", key_secret);
//       hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
//       const generated_signature = hmac.digest("hex");
  
//       if (razorpay_signature === generated_signature) {
//           let pay = new payment_model(req.body);
//           pay.userid=userId;
//           pay.amount=(amount>=500?amount*1.1:amount);
//           pay.transationid = razorpay_payment_id;
//           pay.transation_status="settlement"
//           pay.pay_status="deposit"
//           pay.save();
//         res.json({ success: true, message: "Payment has been verified" });
//       } else res.json({ success: false, message: "Payment verification failed" });
//   }