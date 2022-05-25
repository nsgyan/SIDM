const bcrypt= require('bcrypt')
const Assessor= require('../models/assessor')
const jwt = require('jsonwebtoken');


exports.signup = async (req, res, next) => {
    bcrypt.hash(req.body.panNumber, 10).then(
      (hash) => {
        const assessor = new Assessor({
          email: req.body.email,
          mobile: req.body.mobile,
          panNumber: hash
        });
        assessor.save().then(
          () => {
            res.status(201).json({
              message: 'assessor added successfully!'
            });
          }
        ).catch(
          (error) => {
              if(error.code === 11000){
            res.status(500).json(
                'email and mobile number must be unique'
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
   const mobile= req.body.mobile;
   const  panNumber= req.body.panNumber
   await Assessor.findOne({email:email,mobile:mobile}).then(data=>{
        const panNumberMatch =  bcrypt.compare(panNumber, data.panNumber);
        if(panNumberMatch){
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                email: email,
                mobile: mobile ,
                panNumber:panNumber

            }, 'saaffffgfhteresfdxvbcgfhtdsefgfbdhtg'
            );

            res.status(200).send({ token: token })
         
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
  