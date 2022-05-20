const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionnaireAissmentSchema = new Schema({
        createAt: { type: Date,default:new Date() },
        userId:{ type: String },
        totalScore:{type:String},
        category:{ type: String },
        dropdownAns:[], 
        multiSelectAns:[],
        document:{ type: String },
        textBoxAns:{type: String},
})

module.exports = mongoose.model('questionnaireAissment', questionnaireAissmentSchema);