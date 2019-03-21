var express = require('express');
var router = express.Router();
var creds = require('../creds');
var emailStructure = require('../emailStructure');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
    auth: {
      service: 'SendGrid',
      api_user: creds.user,
      api_key: creds.psw
    }
  }
  var client = nodemailer.createTransport(sgTransport(options));


// Send email to caddress
router.post('/send', function(req, res, next){
    console.log(req.body);
    var subject, text, html;
    if(req.body.type == "forgot-psw"){
        subject = emailStructure.forgotPsw.subject;
        text = emailStructure.forgotPsw.text;
        html = emailStructure.forgotPsw.html;
    }
    var email = {
        from: creds.email,
        to: req.body.recipient,
        subject: subject,
        text: text,
        html: html
      };
   
      client.sendMail(email, function(err, info){
        if (err){
          res.send(err);
        }
        else {
          res.json({"Message sent:":info.response});
        }
    });
});

module.exports = router;