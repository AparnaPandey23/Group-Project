var express = require('express');
var router = express.Router();
var creds = require('../creds');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

// Send email to address
router.post('/send', function(req, res, next){
    res.json(creds);
});

module.exports = router;