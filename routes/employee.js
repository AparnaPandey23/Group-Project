var express = require('express');
var router = express.Router();
var Employee = require('../models/employee');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

/* GET requests to render pages */
router.get('/register', function(req, res, next) {
    res.render('registerEMP');
});

/* POST requests for registration and login */ 
router.post('/register', function(req, res, next){
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

    Employee.findOne({'user_name': username}, function (err, employee) {
        if (err)
            res.send(err);
        if (employee) {
            if (employee.validPassword(password)) {
                employee.access_token = createJwt({emp_id: employee._id});
                employee.save();
                res.cookie('Authorization', 'Bearer ' + employee.access_token); 
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
            res.json({"empid":profile});
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