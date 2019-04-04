var express = require('express');
var router = express.Router();
var Comment = require('../models/comments');
var jwt = require('jsonwebtoken');

// router.all('/*', function (req, res, next) {
//     req.app.locals.layout = 'layout2'; // set your layout here
//     next(); // pass control to the next handler
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Toddler Town' , layout: 'layout'});
});


router.get('/feed', function(req, res, next) {
    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            if(profile.user_id){
                res.render('welcomePage', { title: 'Feed' ,layout: 'layout2'}); 
            } else if(profile.emp_id){
                res.render('welcomePage', { title: 'Feed' ,layout: 'layout3'});                
            }
        }

        
    }catch (err) {
            res.json({
                "status": "error",
                "body": [
                    "You are not logged in."
                ]
            });
        }
});

//added
router.get('/settings', function(req, res, next) {
    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            if(profile.user_id){
                res.render('settings', { title: 'Settings' ,layout: 'layout2'}); 
            } else if(profile.emp_id){
                res.render('settings', { title: 'Settings' ,layout: 'layout2'}); 
            }
        }
    }catch (err) {
            res.json({
                "status": "error",
                "body": [
                    "You are not logged in."
                ]
            });
        }
});

//added
router.get('/profile', function(req, res, next) {

    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            if(profile.user_id){
                res.render('profile', { title: 'Settings' ,layout: 'User Profile'}); 
            } else if(profile.emp_id){
                res.render('profile', { title: 'Settings' ,layout: 'User Profile'}); 
            }
        }
    }catch (err) {
            res.json({
                "status": "error",
                "body": [
                    "You are not logged in."
                ]
            });
        }
});

router.get('/currentUser', function(req, res, next) {
    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            res.json({"userid":profile});
        }
    }catch (err) {
            res.json({
                "status": "error",
                "body": [
                    "You are not logged in."
                ]
            });
        }
});


function verifyJwt(jwtString) {
    var value = jwt.verify(jwtString, 'CSIsTheWorst');
    return value;
}

module.exports = router;
