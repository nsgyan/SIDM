const Questionnaires = require("../models/questionnaires")
const questionnaireAissment= require("../models/questionnaireAissment")
const RegistrationForm = require("../models/registrationForm");
exports.addQuestionnaires= (req,res,next)=>{
    const category = req.body.category;
    const parameter = req.body.parameter;
    const maxScore = req.body.maxScore;
    const options = req.body.options;
    const inputType= req.body.inputType
    const upload= req.body.upload;
    const textBox=req.body.textBox
    const typeOfApplicant = req.body.typeOfApplicant;

    const Questionnaire= new  Questionnaires({
        category :category,
        parameter : parameter,
        maxScore : maxScore,
        options:options,
        inputType:inputType,
        upload:upload,
        textBox:textBox,
        typeOfApplicant:typeOfApplicant
    })
    Questionnaire.save().then(data=>{
    
        res.status(200).json('successfully sumbit');
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
       data.save((err, success) => {
            if(err){
           res.status(404).json(err);
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
            res.status(404).send('not Found Questionnaire in that category')
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
    const aissment= new questionnaireAissment({
        userId:userId,
        totalScore:totalScore,
        questionAns:questionAns,
        category:category
    })
    aissment.save().then(data=>{
        RegistrationForm.findById(userId).then(data=>{
            data.questionnaireStatus='sumbit'
            data.save().then(data=>{
                res.status(200).json('successfully sumbit');
            })})
    }).catch(err=>{
        res.json("internal server error");
    })
}

exports.getAissmentQuestionnaire=(req,res)=>{
    const userId= req.params.userId
    questionnaireAissment.find({userId:userId}).then(data=>{
        if (data) {
            res.status(200).send(data)
        }
        else {
            res.status(404).send('not Found Questionnaire in that category')
        }

    })
    .catch(err => {
        res.json("internal server error");
    })
 
 
}