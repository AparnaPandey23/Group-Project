var express = require('express');
var router = express.Router();
var Creche = require('../models/creche');
var jwt = require('jsonwebtoken');
var Link = require('../models/links');

/* GET add new Creche page. */
router.get('/newCreche', function(req, res, next) {
    res.render('CrecheSetup', { title: 'New Creche', layout:"layout" });
});

/* GET add landing  page. */
router.get('/home', function(req, res, next) {
    try {
        var userJwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(userJwtString[1]);
        
        if (profile) {
            if(profile.emp_id){
                res.render('privacy', { title: 'Privacy' ,layout: 'layout3'});                
            }
        }
    } catch (err) {
            res.json({
                "status": "error",
                "body": [
                    "Staff member not logged in."
                ]
            });
        }
});

router.post('/newcreche', function(req, res, next){
    var name = req.body.creche_name;
    var email = req.body.creche_email; 
    var a1 = req.body.creche_a1;
    var a2 = req.body.creche_a2; 
    var a3 = req.body.creche_a3;
    var a4 = req.body.creche_a4; 
    var id_work = req.body.creche_emp; // all good somthing to do with the jac
    console.log(id_work);
    var newcreche = new Creche ()
    // set the childs local credentials
    newcreche.name = name;
    newcreche.email = email;   
    newcreche.street = a1;  
    newcreche.town= a2;  
    newcreche.country= a3;  
    newcreche.postcode= a4;  
    newcreche.save(function(err, creche) {
        if (err)
            throw err;
        creche.access_token = createJwt({creche_id:creche._id});
        res.cookie('Authorization_Creche', 'Bearer ' + creche.access_token); 
        res.json({'success' : 'Creche Registered created: ' + creche.access_token, 'id':creche._id});
        newLink = new Link();
        newLink.creche_id = creche._id;
        console.log(id_work);
        newLink.emp_id = id_work;
        newLink.save(function(err,link){
            if (err)
                throw err;
            else
                console.log("Yes");
        });
    });
});

router.post('/login', function(req, res, next){
    var id = req.body.creche_id;
    Creche.findOne({ '_id' :  id }, function(err, creche) {
        if (err)
            res.send(err);
        if (creche) {
            creche.access_token = createJwt({creche_id:creche._id});
            res.cookie('Authorization_Creche', 'Bearer ' + creche.access_token); 
            res.json({'success' : 'Creche Logged in: ' + creche.access_token});
        }
    });
});
function createJwt(profile) {
    return jwt.sign(profile, 'CSIsTheWorst', {
        expiresIn: '2d'
    });
}

/* GET request to return profile of user currently logged in */
router.get('/currentCreche', function(req, res, next) {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
         Link.findOne({'emp_id':profile.emp_id}, function(err, link) {
        if (err)
            res.send(err);
        if (link) {
            res.json({"Creche":link});
        }
    })
});

function verifyJwt(jwtString) {
    var value = jwt.verify(jwtString, 'CSIsTheWorst');
    return value;
}


module.exports = router;