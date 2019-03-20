var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Employee = require('../models/employee');
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

router.post('/registerEMP', function(req, res, next){
    var username = req.body.user_name;
    var password = req.body.password;
    var email = req.body.email;

    Employee.findOne({ 'user_name' :  username }, function(err, user) {
        if (err)
            res.send(err);
        if (user) {
            res.status(401).json({
                "status": "info",
                "body": "Username already taken"
            });
        } else {
            var newEMP = new Employee();
            newEMP.user_name = username;
            newEMP.password = newEMP.generateHash(password);
            newEMP.email = email;

            newEMP.save(function(err, employee) {
                if (err)
                    throw err;

                employee.access_token = createJwt({emp_id:employee._id});
                res.cookie('Authorization', 'Bearer ' + employee.access_token); 
                res.json({'success' : employee.access_token});
            });
	}
    });
});

router.post('/login', function(req, res, next){
    var username = req.body.user_name;
    var password = req.body.password;

    // 3. Check if the username exists in the database
    User.findOne({'user_name': username}, function (err, user) {
        // 4. If there are any errors, return the error
        if (err)
            res.send(err);
        // 5. If user account found then check the password
        if (user) {
          // Compare passwords
            if (user.validPassword(password)) {
                // 6. Success : Assign new access token for the session
                user.access_token = createJwt({user_id: user._id});
                user.save();

                // 10. Send back a cookie with the access token to the user
                res.cookie('Authorization', 'Bearer ' + user.access_token); 

                // 11. Inform the browser that the user has successully signed up
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


router.post('/loginEMP', function(req, res, next){
    var username = req.body.user_name;
    var password = req.body.password;

    // 3. Check if the username exists in the database
    Employee.findOne({'user_name': username}, function (err, employee) {
        // 4. If there are any errors, return the error
        if (err)
            res.send(err);
        // 5. If user account found then check the password
        if (employee) {
          // Compare passwords
            if (employee.validPassword(password)) {
                // 6. Success : Assign new access token for the session
                employee.access_token = createJwt({user_id: employee._id});
                employee.save();

                // 10. Send back a cookie with the access token to the user
                res.cookie('Authorization', 'Bearer ' + employee.access_token); 

                // 11. Inform the browser that the user has successully signed up
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
        console.log(err);
            res.json({
                "status": "error",
                "body": [
                    "You are not logged in."
                ]
            });
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

module.exports = router;