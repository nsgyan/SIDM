const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionnaireAissmentSchema = new Schema({
        createAt: { type: Date,default:new Date() },
        userId:{ type: String,unique:true },
        totalScore:{type:String},
        category:{ type: String },
        questionAns:[], 
        assessor:[],
        staticTable:[],
        staticAnswer:{type:String},
        staticMaxScore:{type:String},
        staticScore:{ type: String },
        secoundStaticAnswer:{type:String},
        secoundStaticTable:[] ,
        secoundStaticScore:{type:String},
        secoundStaticMaxScore:{type:String} ,
        adminRemark:{ type: String },
        status:{ type: String,default:'Pending' },
        assessorRemark:{ type: String },
        
        
        
})

module.exports = mongoose.model('questionnaireAissment', questionnaireAissmentSchema);