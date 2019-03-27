var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
require('./util'); 


var EmployeeSchema = new Schema({
    user_name: {type: String},
    password: String,
    email: String,
    rank: {type: String, default: 0 }, // sould be between 1-10 //
    creche_id: {type: String, default: null },
    fb_id: { type: String, default: null },
    access_token: String
});

/*
 * Hashes the password for storage in the DB
 */
EmployeeSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// Compares passwords to determine if the user is who they say they are
EmployeeSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

//expoting scema to server
module.exports = mongoose.model('Employee', EmployeeSchema);
