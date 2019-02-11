var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
require('./util');


var usersSchema = new Schema({
    user_name: {type: String},
    password: String,
    email: String,
    fb_id: { type: String, default: null },
    access_token: String
});
