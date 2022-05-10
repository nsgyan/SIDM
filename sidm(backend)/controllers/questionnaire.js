const Questionnaires = require("../models/questionnaires")

exports.addQuestionnaires= (req,res,next)=>{
    const category = req.body.category;
    const parameter = req.body.parameter;
    const weightage = req.body.weightage;
    const options = req.body.options;

    const Questionnaire= new  Questionnaires({
        category :category,
        parameter : parameter,
        weightage : weightage,
        options:options
    })
    Questionnaire.save().then(data=>{
        res.status(200).json('successfully sumbit');
    }).catch(err=>{
        res.json(err);
    })
}
exports.addQuestionnaires= (req,res,next)=>{
     Questionnaires.find()
    Questionnaire.save().then(data=>{
        res.status(200).send(data);
    }).catch(err=>{
        res.json(err);
    })
}