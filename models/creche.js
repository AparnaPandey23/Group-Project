var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');


var usersSchema = new Schema({
    name: {type: String},
    email: String
});
