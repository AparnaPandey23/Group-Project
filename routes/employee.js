var express = require('express');
var router = express.Router();
var Employee = require('../models/employee');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var Link = require('../models/links');

/* GET requests to render pages */
router.get('/register', function(req, res, next) {
    res.render('registerEMP');
});

router.get('/NewEmployee', function(req, res, next) {
    res.render('registerEMPM', { title: 'Register Employee', layout: "layout3" });
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


router.post('/registerM', function(req, res, next){
    var username = req.body.user_name;
    var password = req.body.password;
    var email = req.body.email;
    var C_id = req.body.C_id;

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
            newEMP.creche_id = C_id;

            newEMP.save(function(err, employee) {
                if (err)
                    throw err;  
                else{
                    var newLink = new Link();
                    newLink.creche_id = C_id
                    newLink.emp_id = employee._id;
                    newLink.save(function(err,link){
                if (err)
                    throw err;
                else
                    console.log("Yes");
                });

                }
                res.json({'success' : "suck"});
            });
	}
    });
});



router.post('/updateCreche', function(req, res, next){
    var emp_id = req.body.emp_id;
    var creche_id = req.body.creche_id;
    
    Employee.findOne({ '_id' :  emp_id }, function(err, emp) {
        if (err)
            res.send(err);
        if (emp) {
            emp.creche_id = creche_id;
            emp.save(function(err, employee) {
                if (err)
                    throw err;
                
            });
        } 
        
        res.json({'success' : 'Creche added to user'});
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
                res.json({'creche_id' : employee.creche_id});
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
            res.json({
                "status": "error",
                "body": [
                    "You are not logged in."
                ]
            });
        }
});

// get the id of the crech assosiated of the 
router.get('/currentCreche', function(req, res, next) {
    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            Employee.findOne({'_id': profile.user_id}, function (err, user){
                if (err)    res.send(err);
                    if (user)   res.json({"empid":user.creche_id});
            }
        );
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



function createJwt(profile) {
    return jwt.sign(profile, 'CSIsTheWorst', {
        expiresIn: '2d'
    });
}

function verifyJwt(jwtString) {
    var value = jwt.verify(jwtString, 'CSIsTheWorst');
    return value;
}


/* GET request to return username of user currently logged in */
router.get('/getUserById', function(req, res, next) {
    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);

        if (profile)
        {
            userid = profile.emp_id;
            try 
            {
                Employee.findOne({'_id': userid}, function (err, user)
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

module.exports = router;