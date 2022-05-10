const Questionnaires = require("../models/questionnaires")

exports.addQuestionnaires= (req,res,next)=>{
    const category = req.body.category;
    const parameter = req.body.parameter;
    const maxWeightage = req.body.maxWeightage;
    const options = req.body.options;

    const Questionnaire= new  Questionnaires({
        category :category,
        parameter : parameter,
        maxWeightage : maxWeightage,
        options:options
    })
    Questionnaire.save().then(data=>{
        res.status(200).json('successfully sumbit');
    }).catch(err=>{
        res.json(err);
    })
}
exports.getQuestionnaires= (req,res,next)=>{
     Questionnaires.find()
     .then(data=>{
        res.status(200).send(data);
    }).catch(err=>{
        res.json(err);
    })
}
exports.getQuestionnairesByID= (req,res,next)=>{
    const id = req.params.id
    Questionnaires.findById(id)
    .then(data=>{
       res.status(200).send(data);
   }).catch(err=>{
       res.json(err);
   })
}