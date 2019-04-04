var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');


var roomSchema = new Schema({
    name: {type: String},
    creche_id: String,
    capacity: String
});


module.exports = mongoose.model('Room', roomSchema );