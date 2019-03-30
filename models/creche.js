var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');


var crecheSchema = new Schema({
    name: {type: String},
    email: String,
    street: String,
    town: String,
    country: String,
    postcode: String
});


module.exports = mongoose.model('Creche', crecheSchema );