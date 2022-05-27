const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AssessorSchema = new Schema({
        createAt: { type: Date,default:new Date() },
        updatedAt: { type: Date ,default:new Date()},
        assessorName:{type:String},
        email:{ type: String,unique:true },
        password:{type:String},
      
        
})

module.exports = mongoose.model('Assessor', AssessorSchema);