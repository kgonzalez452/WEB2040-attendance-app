var mongoose = require('mongoose');

var attSchema = mongoose.Schema({
    sid: String,
    date: Date(),
    signature: String,
    onsite: Boolean
});

module.exports = mongoose.model('att', attSchema)