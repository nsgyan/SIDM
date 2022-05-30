const bcrypt= require('bcrypt')
const Assessor= require('../models/assessor')
const jwt = require('jsonwebtoken');
const RegistrationForm = require("../models/registrationForm");
const registrationForm = require('../models/registrationForm');


exports.signup = async (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const assessor = new Assessor({
          email: req.body.email,
          password: hash,
          assessorName: req.body.assessorName,
          
        });
        assessor.save().then(
          (data) => {
            RegistrationForm.find().then((formdata)=>{
for(let item of formdata){
 item.assessor.push({
   id:data._id,
  assessorName:data.assessorName,
  email:data.email,
  status:'Pending',
  maxScore:null,
  score:null,
 })
 RegistrationForm.findById(item._id).then(i=>{
   i.assessor=item.assessor;
   i.save()
 })
}
res.status(201).json({
  message: 'assessor added successfully!'
});
            })
          }
        ).catch(
          (error) => {
              if(error.code === 11000){
            res.status(500).json(
                'email  must be unique'
            );
        }
        else{
            res.send("Internal server error");
        }
          }
        );
      }
    );
  };
  
  exports.login = async(req, res, next) => {  
   const email= req.body.email;
   const  password= req.body.password
   await Assessor.findOne({email:email}).then(data=>{
        const passwordMatch =  bcrypt.compare(password, data.password);
        if(passwordMatch){
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                email: email,
                password:password,

            }, 'saaffffgfhteresfdxvbcgfhtdsefgfbdhtg'
            );

            res.status(200).send({ token: token,data:data })
         
        }
        else{
            res.status(401).json({
                message: 'invalid pan Number'
              });
        }
    }).catch(
        (error) => {
            res.send("Internal server error");
        }
      );
  };
  
  exports.getEmail = (req, res, next) => {
    const email = req.body.email
    Assessor.findOne({ email: email })
        .then(data => {
            res.status(200).send(data)
        }).catch(err=>{
            res.json("internal server error");
        })
}



exports.getAssessor =(req,res,next)=>{
  Assessor.find().then(data => {
    res.status(200).send(data)
})
.catch(err => {
    res.json("internal server error");
})
}

exports.passwordReset = (req, res, next) => {
  const email = req.body.email
  bcrypt.hash(req.body.password, 10).then((hash)=>{
  Assessor.findOne({email:email}).then(data=>{
  data.save((err,success)=>{
    if(err){
      res.json("internal server error");
    }
    else{
      res.status(200).json('Password successfully reset');
    
    }
  })
    })
  }).catch(err=>{
    res.send("Internal server error");
  })
}
exports.assessmentsList=(req,res)=>{
  const category= req.query.category
  const typeOfApplicant= req.query.typeOfApplicant
  registrationForm.find({category:category,typeOfApplicant:typeOfApplicant}).then(data=>{
    res.status(200).send(data)
  }).catch(err=>{
      res.status(500).json("internal server error");
  })
}
exports.findmember=(req,res)=>{

  const category= req.query.category
  const typeOfApplicant= req.query.typeOfApplicant
  const status= req.query.status
  const asaessorEmail= req.query.asaessorEmail
  RegistrationForm.find({category:category,typeOfApplicant:typeOfApplicant,questionnaireStatus:'sumbit' , assessor : { $elemMatch: {  email : { $gte: asaessorEmail }, status:{ $gte: status }}, } }).then(data=>{
      res.status(200).send(data)
  }).catch(err=>{
      res.status(500).json("internal server error");
  })
}