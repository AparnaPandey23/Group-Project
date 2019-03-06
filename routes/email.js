var express = require('express');
var router = express.Router();
var creds = require('../creds');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var util = require('util');

var options = {
    auth: {
      service: 'SendGrid',
      api_user: creds.user,
      api_key: creds.psw
    }
  }
  var client = nodemailer.createTransport(sgTransport(options));


// Send email to address
router.post('/send', function(req, res, next){
    
    var email = {
        from: creds.email,
        to: req.body.recipient,
        subject: req.body.subject,
        text: req.body.text,
        html: req.body.html
      };
    res.json(email);
});

module.exports = router;