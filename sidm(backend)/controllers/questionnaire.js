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
    const id = req.params.userID
    Questionnaires.findById(id)
    .then(data=>{
       res.status(200).send(data);
   }).catch(err=>{
       res.json(err);
   })
}
exports.updateQuestionnaires=(req,res)=>{
    const category = req.body.category;
    const parameter = req.body.parameter;
    const maxWeightage = req.body.maxWeightage;
    const options = req.body.options;
    const id = req.params.userID
    Questionnaires.findById(id)
    .then(data=>{
        data.category =category,
        data.parameter = parameter,
        data.maxWeightage = maxWeightage,
        data.options=options
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
       res.json(err);
   })

}
exports.findByCategory=(req,res)=>{
    const category =req.body.category
    Questionnaires.find({category:category}).then(data=>{
        if (data) {
            res.status(200).send(data)
        }
        else {
            res.status(404).send('not Found Questionnaire in that category')
        }

    })
    .catch(err => {
        res.send(err)
    })
}