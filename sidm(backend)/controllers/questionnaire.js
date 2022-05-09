const Questionnaires = require("../models/questionnaires")

exports.addQuestionnaires= (req,res,next)=>{
    const category = req.body.category;
    const typeOfApplicant = req.body.typeOfApplicant;
    const question = req.body.question;
    const Questionnaire= new  Questionnaires({
        category :category,
     typeOfApplicant : typeOfApplicant,
     question : question
    })
    Questionnaire.save().then(data=>{
        res.status(200).json('successfully sumbit');
    }).catch(err=>{
        res.json(err);
    })
}