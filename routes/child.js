var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var Child = require('../models/child');

/* GET child list page. */
router.get('/children', function(req, res, next) {
  res.render('childList', { title: 'View Children' ,layout: 'layout2' });
});

/* GET add child page. */
router.get('/addChild', function(req, res, next) {
  res.render('addChild', { title: 'Add Child' ,layout: 'layout2'});
});


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addchild', function(req, res, next){
    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        
        if (profile) {
            var userid = profile.user_id;
            
            // Details of child entered by user
            var childfname = req.body.child_fname;
            var childlname = req.body.child_lname; 
            var Dob = req.body.dob;
            var par = req.body.parName;

            // Create new child object
            var newchild = new Child();
            
            // Set the childs local credentials
            newchild.child_fname = childfname ;
            newchild.child_lname = childlname;   
            newchild.dob = Dob;
            newchild.par_id = userid;
            newchild.parName = par;

            // Save child to database
            newchild.save(function(err, child) {
                if (err)
                    throw err;
                res.json({'success' : 'Child created'});
            });
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
// will get every child in the database will have to change this to prevent this from happning 
router.get('/getchild'
           , function(req, res, next)
           {
    Child.find({userid:req.query.userid}, function (err,child_fname) {
        if (err)
            res.send(err);
        res.json(child_fname);
    });
});

// Return all children given parent id (json request)
router.post('/getChildren', function(req, res, next){
    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        
        if (profile) {
            var userid = profile.user_id;
            Child.find({par_id:userid}, function (err,child_fname) {
                if (err)
                    res.send(err);
                res.json(child_fname);
            });
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

// NOT CHANGED TO JWT YET - UNTIL ADDING DELETE CHILD BUTTON
// deleate the Child Request need to pass in the id of the child to be deleated
router.delete('/delchild/:id', function(req, res ,next){
    var id = req.params.id; 
    Child.remove({_id:id}, function(err, child_fname){ /*Deleates the Comment by Id*/
        if(err)
            res.send(err);
        res.json(child_fname); /* Returns the list of comments */
    });
});

function verifyJwt(jwtString) {
    var value = jwt.verify(jwtString, 'CSIsTheWorst');
    return value;
}

module.exports = router;