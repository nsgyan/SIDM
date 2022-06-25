const Questionnaires = require("../models/questionnaires")
const questionnaireAissment= require("../models/questionnaireAissment")
const RegistrationForm = require("../models/registrationForm");
const Assessor= require('../models/assessor');

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
  
exports.addQuestionnaires= (req,res,next)=>{
    const category = req.body.category;
    const parameter = req.body.parameter;
    const maxScore = req.body.maxScore;
    const options = req.body.options;
    const inputType= req.body.inputType
    const upload= req.body.upload;
    const textBox=req.body.textBox
    const typeOfApplicant = req.body.typeOfApplicant;
    const parameterDescription= req.body.parameterDescription

    const Questionnaire= new  Questionnaires({
        category :category,
        parameter : parameter,
        maxScore : maxScore,
        options:options,
        inputType:inputType,
        upload:upload,
        textBox:textBox,
        typeOfApplicant:typeOfApplicant,
        parameterDescription:parameterDescription
    })
    Questionnaire.save().then(data=>{
    
        res.status(200).json('successfully Submitted');
    }).catch(err=>{
        res.json("internal server error");
    })
}
exports.getQuestionnaires= (req,res,next)=>{
     Questionnaires.find()
     .then(data=>{
        res.status(200).send(data);
    }).catch(err=>{
        res.json("internal server error");
    })
}
exports.getQuestionnairesByID= (req,res,next)=>{
    const id = req.params.userID
    Questionnaires.findById(id)
    .then(data=>{
       res.status(200).send(data);
   }).catch(err=>{
    res.json("internal server error");
   })
}
exports.deleteQuestionnairesByID= (req,res,next)=>{
    const id = req.params.userID
    Questionnaires.findByIdAndRemove(id)
    .then(data=>{
       res.status(200).send(data);
   }).catch(err=>{
    res.json("internal server error");
   })
}
exports.updateQuestionnaires=(req,res)=>{
    const category = req.body.category;
    const parameter = req.body.parameter;
    const typeOfApplicant = req.body.typeOfApplicant;
    const maxScore = req.body.maxScore;
    const options = req.body.options;
    const inputType= req.body.inputType
    const upload= req.body.upload;
    const textBox=req.body.textBox
    const parameterDescription=req.body.parameterDescription
    const id = req.params.userID
    Questionnaires.findById(id)
    .then(data=>{
        data.category =category,
        data.parameter = parameter,
        data.typeOfApplicant = typeOfApplicant,
        data.maxScore = maxScore,
        data.options=options,
        data.inputType=inputType,
        data.upload=upload,
        data.textBox=textBox
        data.parameterDescription=parameterDescription
       data.save((err, success) => {
            if(err){
           res.status(401).json(err);
            }
            else{
                console.log(success);
              res.status(200).json('successfully update');
            }
          });
   }).catch(err=>{
    res.json("internal server error");
   })

}
exports.findByCategory=(req,res)=>{
    // console.log(req.params)
    console.log(req.body)
    const category =req.body.category
    const typeOfApplicant =req.body.typeOfApplicant
    Questionnaires.find( {$or:[{typeOfApplicant: typeOfApplicant},{typeOfApplicant:'A'}],category:category}).then(data=>{
        if (data) {
            res.status(200).send(data)
        }
        else {
            res.status(401).send('not Found Questionnaire in that category')
        }

    })
    .catch(err => {
        res.json("internal server error");
    })
}
exports.aissmentQuestionnaire=(req,res)=>{
    const userId= req.body.userId
    const totalScore= req.body.totalScore
    const questionAns= req.body.questionAns
    const category= req.body.category
    const status= req.body.status
    const aissment= new questionnaireAissment({
        userId:userId,
        totalScore:totalScore,
        questionAns:questionAns,
        category:category
    })
    aissment.save().then(savedAissment=>{
        RegistrationForm.findById(userId).then(data=>{
         
               
            data.assessor=[]
            Assessor.find().then(item=>{
for(i of item){ 
    data.assessor.push({
        id:i._id,
       assessorName:i.assessorName,
       email:i.email,
        status:'Pending',
        maxScore:null,
        score:null,
        remark:null,
        applicantScore:null,
        totalScore:null,
        doccument:null
      })
     
}
 data.questionnaireStatus=status
data.save().then(data=>{
    if(status==='Submitted'){
        const filePath = path.join(__dirname, '../view/questionairesubmitted.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
    
        var maillist = [
            data.email,
          'bharat.jain@sidm.in',
          'awards22@sidm.in',
          'vikas.rai@sidm.in',
          'manoj.mishra@sidm.in'
           
  
        ];
        const replacements = {
            typeOfApplicant:data.typeOfApplicant,
            category: data.category,
            companyName:data.companyName,
            date:new Date()
    
          };
        
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
           
          } else {
          
          }
        })}
       
    savedAissment.assessor=data.assessor
    savedAissment.save().then(item=>{
     
        
            res.status(200).json('successfully Submitted');
    })
  
})
 })
           })
    }).catch(err=>{
        res.json("internal server error");
    })
}
exports.updateAissmentQuestionnaire=(req,res)=>{
    const userId= req.body.userId
    const doccumentAskedByAdmin= req.body.doccumentAskedByAdmin
    const questionnaireStatus= req.body.questionnaireStatus
    const id= req.body.id
    const adminRemark= req.body.adminRemark
    const totalScore= req.body.totalScore
    const questionAns= req.body.questionAns
    const category= req.body.category
    questionnaireAissment.findById(id).then(assessment=>{
        assessment.userId=userId,
         assessment.doccumentAskedByAdmin=doccumentAskedByAdmin,
        assessment.adminRemark=adminRemark,
        assessment.totalScore=totalScore,
        assessment.questionAns=questionAns,
        assessment.category=category,
        assessment.status=questionnaireStatus,
        assessment.save().then(data=>{
            RegistrationForm.findById(userId).then(data=>{
                data.questionnaireStatus=questionnaireStatus,
                
                data.save().then(data=>{
                    let filePath
                    if(questionnaireStatus==='Submitted'||questionnaireStatus==='approved'||questionnaireStatus==='requestInfo'){
                    if(questionnaireStatus==='approved'){
                        filePath = path.join(__dirname, '../view/questionaireApprove.html');}
                        else if(questionnaireStatus==='Submitted'){
                         filePath = path.join(__dirname, '../view/questionairesubmitted.html');
                        }
                       else {
                         filePath = path.join(__dirname, '../view/requestInfo.html');
                       }
                const source = fs.readFileSync(filePath, 'utf-8').toString();
                const template = handlebars.compile(source);
            
                var maillist = [
                    data.email,
                  'bharat.jain@sidm.in',
                  'awards22@sidm.in',
                  'vikas.rai@sidm.in',
                  'manoj.mishra@sidm.in'
                   
          
                ];
                const replacements = {
                    typeOfApplicant:data.typeOfApplicant,
                    category: data.category,
                    companyName:data.companyName,
                    date:new Date()
            
                  };
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
                   
                  } else {
                  
                  }
                })}
               
                    res.status(200).json('successfully Submitted');
                })
            
               })
        })

    }).catch(err=>{
        res.json("internal server error");
    })
}

exports.staticissmentQuestionnaire=(req,res)=>{
    const userId= req.body.userId
    const totalScore= req.body.totalScore
    const questionAns= req.body.questionAns
    const category= req.body.category
    const staticScore= req.body.staticScore
    const staticMaxScore= req.body.staticMaxScore
    const staticAnswer= req.body.staticAnswer
    const staticTable= req.body.staticTable
    const secoundStaticScore= req.body.secoundStaticScore
    const secoundStaticMaxScore= req.body.secoundStaticMaxScore
    const secoundStaticAnswer= req.body.secoundStaticAnswer
    const secoundStaticTable= req.body.secoundStaticTable
    const staticAssessor= req.body.staticAssessor
    const secoundStaticAssessor= req.body.secoundStaticAssessor
    const status= req.body.status
    const aissment= new questionnaireAissment({
        userId:userId,
        totalScore:totalScore,
        staticAssessor:staticAssessor,
        secoundStaticAssessor:secoundStaticAssessor,
        questionAns:questionAns,
        category:category,
        staticScore:staticScore,
        staticMaxScore:staticMaxScore,
        staticAnswer:staticAnswer,
        staticTable:staticTable,
        secoundStaticScore:secoundStaticScore,
        secoundStaticMaxScore:secoundStaticMaxScore,
        secoundStaticAnswer:secoundStaticAnswer,
        secoundStaticTable:secoundStaticTable,
        
    })
    aissment.save().then(savedAissment=>{
        RegistrationForm.findById(userId).then(data=>{
            if(status==='Submitted'){
                const filePath = path.join(__dirname, '../view/questionairesubmitted.html');
                const source = fs.readFileSync(filePath, 'utf-8').toString();
                const template = handlebars.compile(source);
            
                var maillist = [
                    data.email,
                  'bharat.jain@sidm.in',
                  'awards22@sidm.in',
                  'vikas.rai@sidm.in',
                  'manoj.mishra@sidm.in'
                   
          
                ];
                const replacements = {
                    typeOfApplicant:data.typeOfApplicant,
                    category: data.category,
                    companyName:data.companyName,
                    date:new Date()
            
                  };
                
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
                   
                  } else {
                  
                  }
                })}
           
            data.assessor=[]
            Assessor.find().then(item=>{
for(i of item){ 
    data.assessor.push({
        id:i._id,
       assessorName:i.assessorName,
       email:i.email,
        status:'Pending',
        maxScore:null,
        score:null,
        remark:null,
        applicantScore:null,
        totalScore:null,
        doccument:null
      })
      console.log(data.assessor)
} data.questionnaireStatus=status
data.save().then(data=>{
    savedAissment.assessor=data.assessor
    savedAissment.save().then(item=>{
        res.status(200).json('successfully Submitted');
    })
})
 })
           })
    }).catch(err=>{
        res.json("internal server error");
    })
}

exports.updateStaticissmentQuestionnaire=(req,res)=>{
    const userId= req.body.userId
    const doccumentAskedByAdmin= req.body.doccumentAskedByAdmin
    
    const questionnaireStatus= req.body.questionnaireStatus
    const id= req.body.id
    const adminRemark= req.body.adminRemark
    const totalScore= req.body.totalScore
    const questionAns= req.body.questionAns
    const category= req.body.category
    const staticScore= req.body.staticScore
    const staticMaxScore= req.body.staticMaxScore
    const staticAnswer= req.body.staticAnswer
    const staticTable= req.body.staticTable
    const secoundStaticMaxScore= req.body.secoundStaticMaxScore
    const secoundStaticScore= req.body.secoundStaticScore
    const secoundStaticAnswer= req.body.secoundStaticAnswer
    const secoundStaticTable= req.body.secoundStaticTable
    const staticAssessor= req.body.staticAssessor
    const secoundStaticAssessor= req.body.secoundStaticAssessor
    
    questionnaireAissment.findById(id).then(assessment=>{
        assessment.userId=userId,
        assessment.doccumentAskedByAdmin=doccumentAskedByAdmin,
        assessment.adminRemark=adminRemark,
        assessment.staticAssessor=staticAssessor,
        assessment.secoundStaticAssessor=secoundStaticAssessor,
        assessment.totalScore=totalScore,
        assessment.status=questionnaireStatus,
        assessment.questionAns=questionAns,
        assessment.category=category,
        assessment.staticScore=staticScore,
        assessment.staticMaxScore=staticMaxScore,
        assessment.staticAnswer=staticAnswer,
        assessment.staticTable=staticTable,
        assessment.secoundStaticMaxScore=secoundStaticMaxScore,
        assessment.secoundStaticScore=secoundStaticScore,
        assessment.secoundStaticAnswer=secoundStaticAnswer,
        assessment.secoundStaticTable=secoundStaticTable,
        assessment.save().then(data=>{
            RegistrationForm.findById(userId).then(data=>{
                data.questionnaireStatus=questionnaireStatus
                data.save().then(data=>{
                    if(questionnaireStatus==='Submitted'||questionnaireStatus==='approved'||questionnaireStatus==='requestInfo'){
                        if(questionnaireStatus==='approved'){
                            filePath = path.join(__dirname, '../view/questionaireApprove.html');}
                            else if(questionnaireStatus==='Submitted'){
                             filePath = path.join(__dirname, '../view/questionairesubmitted.html');
                            }
                           else {
                             filePath = path.join(__dirname, '../view/requestInfo.html');
                           }
                    const source = fs.readFileSync(filePath, 'utf-8').toString();
                    const template = handlebars.compile(source);
                
                    var maillist = [
                        data.email,
                      'bharat.jain@sidm.in',
                      'awards22@sidm.in',
                      'vikas.rai@sidm.in',
                      'manoj.mishra@sidm.in'
                       
              
                    ];
                    const replacements = {
                        typeOfApplicant:data.typeOfApplicant,
                        category: data.category,
                        companyName:data.companyName,
                        date:new Date()
                
                      };
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
                       
                      } else {
                      
                      }
                    })}
                    res.status(200).json('successfully Submitted');
                })
               })
        })

    }).catch(err=>{
        res.json("internal server error");
    })
   
  
}


exports.getAissmentQuestionnaire=(req,res)=>{
    const userId= req.params.userId
    questionnaireAissment.findOne({userId:userId}).then(data=>{
        if (data) {
            res.status(200).send(data)
        }
        else {
            res.status(401).send('not Found Questionnaire in that category')
        }

    })
    .catch(err => {
        res.json("internal server error");
    })
 
 
}
exports.assessorScore=(req,res)=>{
    const userId= req.body.id
    // const doccumentAskedByAdmin= req.body.doccumentAskedByAdmin
    // const adminReview= req.body.adminReview
    const assessor= req.body.assessor
    const assessorMaxScore= req.body.assessorMaxScore
    const assessorScore= req.body.assessorScore
    const assessorID= req.body.assessorID
    const assessorName= req.body.assessorName
    const assessorEmail= req.body.assessorEmail
    const status= req.body.status
    const questionAns=req.body.aissment
    const assessorRemark=req.body.assessorRemark
    const totalMaxScore=req.body.totalMaxScore
    const TotalObtained=req.body.TotalObtained
    questionnaireAissment.findById(userId).then(data=>{
        data.questionAns=questionAns
        // data.doccumentAskedByAdmin=doccumentAskedByAdmin
        // data.adminReview=adminReview
data.assessor=assessor  
        data.save().then(item=>{
            RegistrationForm.findByIdAndUpdate(item.userId,{$pull:{assessor:{email:assessorEmail}}}).then(savedData=>{
                RegistrationForm.findByIdAndUpdate(item.userId,{$push: {assessor:{id:assessorID,assessorName:assessorName,email:assessorEmail,status:status,maxScore:assessorMaxScore,score:assessorScore,remark:assessorRemark,applicantScore:TotalObtained,totalScore:totalMaxScore}}}).then(savedData=>{
                    res.status(200).send(data)
                })
            })
       
        })
    }).catch(err=>{
        res.json("internal server error");
    })
}
exports.findmember=(req,res)=>{
    const category= req.query.category
    const typeOfApplicant= req.query.typeOfApplicant
    RegistrationForm.find({category:category,typeOfApplicant:typeOfApplicant,questionnaireStatus:'approved'}).then(data=>{
        res.status(200).send(data)
    }).catch(err=>{
        res.json("internal server error");
    })
}
exports.applicantQuestionnaire=(req,res)=>{
    const category= req.query.category
    const typeOfApplicant= req.query.typeOfApplicant
    RegistrationForm.find({category:category,typeOfApplicant:typeOfApplicant,status:'approved'}).then(data=>{
        res.status(200).send(data)
    }).catch(err=>{
        res.json("internal server error");
    })
}
exports.assessorRequiredDocument=(req,res)=>{
    const userId= req.body.id
    const assessor= req.body.assessor
    const assessorEmail= req.body.assessor.email
    RegistrationForm.findByIdAndUpdate(userId,{$pull:{assessor:{email:assessorEmail}}}).then(savedData=>{
        RegistrationForm.findByIdAndUpdate(userId,{$push: {assessor:{id:assessor.id,assessorName:assessor.assessorName,email:assessorEmail,status:assessor.status,maxScore:assessor.maxScore,score:assessor.score,remark:assessor.remark,applicantScore:assessor.applicantScore,totalScore:assessor.totalScore,document:assessor.document}}}).then(data=>{
            res.status(200).send(data)
        })
    })
}