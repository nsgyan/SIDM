const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionnaireAissmentSchema = new Schema({
        createAt: { type: Date,default:new Date() },
        userId:{ type: String },
        totalScore:{type:String},
        category:{ type: String },
        questionAns:[], 
        assessor:{type:String,default:'Pending'}
        
})

module.exports = mongoose.model('questionnaireAissment', questionnaireAissmentSchema);