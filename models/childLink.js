var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var childlinkSchema = new Schema({
    creche_id: {type: String},
    child_id: {type: String},
    timea: {type: String},
    timeb: {type: String}
});

module.exports = mongoose.model('ChilLink', childlinkSchema);