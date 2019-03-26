var express = require('express');
var router = express.Router();
var User = require('../models/users');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

/* GET requests to render pages */
router.get('/register', function(req, res, next) {
    res.render('register');
});
router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/forgotpass', function(req, res, next) {
    res.render('forgotpass');
});

/* POST requests for registration and login */
router.post('/register', function(req, res, next){
    var username = req.body.user_name;
    var password = req.body.password;
    var email = req.body.email;

    User.findOne({ 'user_name' :  username }, function(err, user) {
        if (err)
            res.send(err);
        if (user) {
            res.status(401).json({
                "status": "info",
                "body": "Username already taken"
            });
        } else {
            var newUser = new User();
            newUser.user_name = username;
            newUser.password = newUser.generateHash(password);
            newUser.email = email;
            
            newUser.save(function(err, user) {
                if (err)
                    throw err;

                user.access_token = createJwt({user_id:user._id});
                res.cookie('Authorization', 'Bearer ' + user.access_token); 
                res.json({'success' : user.access_token});
            });
	}
    });
});


router.post('/login', function(req, res, next){
    var username = req.body.user_name;
    var password = req.body.password;

    User.findOne({'user_name': username}, function (err, user) {
        if (err)
            res.send(err);
        if (user) {
            if (user.validPassword(password)) {
                user.access_token = createJwt({user_id: user._id});
                user.save();
                res.cookie('Authorization', 'Bearer ' + user.access_token); 
                res.json({'success' : 'loggedIn'});
            }
            else {
                res.status(401).send({
                    "status": "error",
                    "body": "Email or password does not match"
                });
            }
        }
        else
        {
            res.status(401).send({
                "status": "error",
                "body": "Username not found"
            });
        } }); });


/* GET request to return profile of user currently logged in */
router.get('/currentUser', function(req, res, next) {
    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            res.json({"userid":profile});
        }
    } catch (err) {
            res.json({
                "status": "error",
                "body": [
                    "You are not logged in."
                ]
            });
        }
});

/* GET request to return username of user currently logged in */
router.get('/getUserById', function(req, res, next) {
    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);

        if (profile)
        {
            userid = profile.user_id;

            try 
            {
                User.findOne({'_id': userid}, function (err, user)
                {
                    if (err)    res.send(err);
                    if (user)   res.json({"user_name":user.user_name});
                    else        res.status(401).send(   {"status": "error", "body": "User not found"});
                });
            } catch (err)
            {
                res.json(   {"status": "error","body": ["You are not logged in."]}  );
            }
        } else res.json(   {"status": "error","body": ["You are not logged in."]}  );
    }
    catch (err)
    {
        res.json(   {"status": "error","body": ["You are not logged in."]}  );
    }   
});

function createJwt(profile) {
    return jwt.sign(profile, 'CSIsTheWorst', {
        expiresIn: '2d'
    });
}

function verifyJwt(jwtString) {
    var value = jwt.verify(jwtString, 'CSIsTheWorst');
    return value;
}

router.post('/getParent', function(req, res, next){
    var username = req.body.user_name;
    User.findOne({'user_name': username}, function (err, user) {
        if (err)
            res.send(err);
        if (user) {
            res.json({"id":user._id});
        }
        else
        {
            res.status(401).send({
                "status": "error",
                "body": "Parent not found"
            });
        } }); });

module.exports = router;