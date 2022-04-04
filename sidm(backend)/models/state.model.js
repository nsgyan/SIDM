const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const stateSchema = new Schema({
    key: { type: String },
    name: { type: String },
});

module.exports = mongoose.model('state', stateSchema);