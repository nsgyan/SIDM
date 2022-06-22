const bcrypt= require('bcrypt')
const adminAssessorSchema= require('../models/adminAssessor')
const jwt = require('jsonwebtoken');
const RegistrationForm = require("../models/registrationForm");
const registrationForm = require('../models/registrationForm');
const { logger } = require('handlebars');


exports.signup = async (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const adminAssessor = new adminAssessorSchema({
          email: req.body.email,
          password: hash,
          assessorName: req.body.assessorName,
          
        });
        adminAssessor.save().then(
          (data) => {
            res.status(201).json({
                message: 'Admin assessor added successfully!'
              });
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
   await adminAssessorSchema.findOne({email:email}).then(data=>{
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
  


  exports.applicantQuestionnaire=(req,res)=>{

    RegistrationForm.find({status:'Approved'}).then(data=>{
        res.status(200).send(data)
    }).catch(err=>{
        res.status(500).json("internal server error");
    })
  }
  exports.aplicantList=(req,res)=>{

    const category= req.query.category
    const typeOfApplicant= req.query.typeOfApplicant
    const status= req.query.status

    RegistrationForm.find({category:category,typeOfApplicant:typeOfApplicant,questionnaireStatus:status }).then(data=>{
      console.log(data)
        res.status(200).send(data)
    }).catch(err=>{
        res.status(500).json("internal server error");
    })
  }