const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionnaireAissmentSchema = new Schema({
        createAt: { type: Date,default:new Date() },
        userId:{ type: String },
        totalScore:{type:String},
        category:{ type: String },
        questionAns:[], 
        assessor:[],
        staticTable:[],
        staticAnswer:{type:String},
        staticMaxScore:{type:String},
        staticScore:{ type: String },
        
        
})

module.exports = mongoose.model('questionnaireAissment', questionnaireAissmentSchema);