const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AssessorSchema = new Schema({
        createAt: { type: Date,default:new Date() },
        updatedAt: { type: Date ,default:new Date()},
        email:{ type: String,unique:true },
        mobile:{type:String,unique:true },
        panNumber:{type:String},
        
})

module.exports = mongoose.model('Assessor', AssessorSchema);