var express = require('express');
var router = express.Router();
var creds = require('../creds');
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
    var email = {
        from: creds.email,
        to: req.body.recipient,
        subject: req.body.subject,
        text: req.body.text,
        html: req.body.html
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