const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const locationSchema = new mongoose.Schema({
    pincode: { type: String },
    Taluk: { type: String },
    Districtname: { type: String },
    statename: { type: String },
    Country: { type: String }
});

module.exports = mongoose.model('location', locationSchema);