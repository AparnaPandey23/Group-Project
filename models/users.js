var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
require('./util');


var usersSchema = new Schema({
    user_name: {type: String},
    password: String,
    email: String,
    fb_id: { type: String, default: null },
    access_token: String,
    full_Name: { type: String, default: null },
    mobile: { type: String, default: null },
    land_Line: { type: String, default: null },
    home_Add: { type: String, default: null },
    work_Add: { type: String, default: null }
});

/*
 * Hashes the password for storage in the DB
 */
usersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// Compares passwords to determine if the user is who they say they are
usersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

//expoting scema to server
module.exports = mongoose.model('User', usersSchema);
