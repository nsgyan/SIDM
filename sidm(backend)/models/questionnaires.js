const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionnairesSchema = new Schema({
        createAt: { type: Date,default:new Date() },
        updatedAt: { type: Date ,default:new Date()},
        category:{ type: String },
        parameter:{type:String},
        maxWeightage:{type:String},
        options:[], 
})

module.exports = mongoose.model('Questionnaires', QuestionnairesSchema);