const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionnairesSchema = new Schema({
        createAt: { type: Date,default:new Date() },
        updatedAt: { type: Date ,default:new Date()},
        category:{ type: String },
        typeOfApplicant:{ type: String },
        parameter:{type:String},
        parameterDescription:{type:String},
        maxScore:{type:Number},
        inputType:{type:String},
        options:[], 
        upload:{type:Boolean,default:false},
        textBox:{type:Boolean,default:false},

})

module.exports = mongoose.model('Questionnaires', QuestionnairesSchema);