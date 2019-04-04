var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var linkSchema = new Schema({
    creche_id: {type: String},
    emp_id: {type: String}
});

module.exports = mongoose.model('Link', linkSchema);