var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://mongodb4696po:vu1myq@danu7.it.nuigalway.ie:8717/mongodb4696', { useNewUrlParser: true });

exports.connection = connection;
