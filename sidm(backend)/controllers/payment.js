const Razorpay = require('razorpay');
var ObjectId = require('mongodb').ObjectID;
const fs = require("fs");
var nodemailer = require('nodemailer');
const path = require('path')
var handlebars = require('handlebars');
const date = require('date-and-time')


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'awardsidm@gmail.com',
    pass: 'gllznygeziabftrf'
  }
});

const RegistrationForm = require("../models/registrationForm");

const PaymentDb = require("../models/paymentSchema");
// var instance = new Razorpay({
//   key_id: 'rzp_live_Zu1ExXrsDrcwKq',
//   key_secret: 'KVc4fjpnn8xe8PWNXDQsUrpt',
// });
var instance = new Razorpay({
  key_id: 'rzp_test_DXNpoNMGmHrPoO',
  key_secret: 'ROwMeHInG0Ir6QDm0cNqYeWK',
});


 exports.payNow= async (req,res)=>{
  let amount;
  let currency;
  let receipt ;
  let notes;
  const typeOfApplicant= req.body.typeOfApplicant
  const category= req.body.category
  const panNumber = req.body.panNumber
  const mobileNumber= req.body.mobileNumber
  const email = req.body.email
   
  

            amount=5000
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
                type: typeOfApplicant,
                category:category,
                panNumber:panNumber,
                mobileNumber:mobileNumber,
                email:email
              }},(err, order) => {
                //STEP 3 & 4:
                if (!err) res.json(order);
                else res.json(err);
              }
            );
         
          
      
 
}

exports.verifypayment= async (req,res)=>{
  const { createAt, razorpay_order_id, razorpay_payment_id,amount} =  req.body;

  const userdata=req.body.note
  console.log(userdata);
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
      if (data) {
      data.paymentStatus='Paid'
        data.status = 'Pending Approval'
      data.paymentId=item._id
        data.save().then(data => {
          const Date= date.format(data.createAt,'YYYY/MM/DD HH:mm');
        const filePath = path.join(__dirname, '../view/finalEmail.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        if (data.category === 'cat1') {
          data.category = 'C1- Technology /  Product Innovation to address Defence Capability Gaps'
        }
        else if (data.category === 'cat2') {
          data.category = 'C2-Import Substitution for Mission Critical Parts / Sub-Systems / Systems'
        }
        else if (data.category === 'cat3') {
          data.category = 'C3-  Creation of   Niche, Technological Capability for Design, Manufacturing or Testing'
        }
        else if (data.category === 'cat4') {
          data.category = 'C4- Export Performance of Defence & Aerospace Products'
        }
        const replacements = {
          typeOfApplicant:data.typeOfApplicant,
          category: data.category,
          companyName:data.nameOfCompany,
          mobileNumber:data.typeOfApplicant,
          PanNumber:data.panNumber,
          date:Date
  
        };
        var maillist = [
          data.email,
          'bharat.jain@sidm.in',
        'awards22@sidm.in',
        'vikas.rai@sidm.in',
        'manoj.mishra@sidm.in'
           
        ];
        
        maillist.toString();
        const htmlToSend = template(replacements);
        var mailOptions = {
          from: 'awardsidm@gmail.com',
          to: maillist,
          subject: 'SIDM Champion Awards 2022',
          html: htmlToSend
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            res.json(error);
          } else {
            res.status(200).json('Please check your email');
          }
        })
          res.status(200).json(item)
        });
      }
      else {
        res.json("internal server error");
      }
    })

  
  }).catch(err=>{
    res.json("internal server error");
  })

}

exports.viewpayment= async (req,res)=>{
  const userID = req.params.userID
  PaymentDb.findById(userID).then(data=>{
    res.status(200).json(data)
  }).catch(err=>{
    res.json("internal server error");
  })
}


