const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserQuestionnairesScoreSchema = new Schema({
        createAt: { type: Date,default:new Date() },
        userId:{ type: String },
        score:{type:String},
        totalScore:{type:String},
        questionAns:[], 
})

module.exports = mongoose.model('userQuestionnairesScore', UserQuestionnairesScoreSchema);