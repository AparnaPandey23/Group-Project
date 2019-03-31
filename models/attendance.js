var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var attendanceSchema = new Schema({
    date: {type:String, default: "jan ,01, 2000"},
    child_id: {type: String},
    attendance: {type: Number}
});

module.exports = mongoose.model('Attendance', attendanceSchema);