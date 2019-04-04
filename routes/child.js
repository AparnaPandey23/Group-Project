var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Child = require('../models/child');
var ChildLink = require('../models/childLink');
var Attendance = require('../models/attendance');

/* GET child list page. */
router.get('/children', function(req, res, next) {
    try {
        var userJwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(userJwtString[1]);
        if (profile) {
            if(profile.user_id)     res.render('childList', { title: 'Children' ,layout: 'layout2'}); 
            else if(profile.emp_id) res.render('childList', { title: 'Children' ,layout: 'layout3'});                
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

/* GET add child page. */
router.get('/addChild', function(req, res, next) {
  try {
    var userJwtString = req.cookies.Authorization.split(" ");
    var profile = verifyJwt(userJwtString[1])
    if (profile) {
        if(profile.user_id)     res.render('addChild', { title: 'Children' ,layout: 'layout2'}); 
        else if(profile.emp_id) res.render('addChild', { title: 'Children' ,layout: 'layout3'});
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

router.post('/addchild', function(req, res, next){
    try {
        var userJwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(userJwtString[1]);
        
        // Create new child object
        var newchild = new Child();

        // If the logged in user is a parent, set its par_id
        if (profile) {
            if(profile.user_id){
                var userid = profile.user_id;
                newchild.par_id = userid;
            } else if(profile.emp_id){
                var crecheJwtString = req.cookies.Authorization_Creche.split(" ");
                var creche = verifyJwt(crecheJwtString[1]);
                newchild.par_id = req.body.parId;
                // Set creche
                var crecheid = creche.creche_id;
                newchild.creche_id = crecheid;
            }
            
            var childfname = req.body.child_fname;
            var childlname = req.body.child_lname;
            var Dob = req.body.dob;

            // Set the childs local credentials
            newchild.child_fname = childfname;
            newchild.child_lname = childlname;   
            newchild.dob = Dob;

            // Save child to database
            newchild.save(function(err, child) {
                if (err)
                    throw err;
                res.json({'success' : 'Child created'});
            });
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
// will get every child in the database will have to change this to prevent this from happning 
router.get('/getchild',function(req, res, next){
    Child.find({userid:req.query.userid}, function (err,child_fname) {
        if (err)
            res.send(err);
        res.json(child_fname);
    });
});

// Return all children given parent id (json request)
router.post('/getChildren', function(req, res, next){
    try {
        var userJwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(userJwtString[1])
        
        if (profile) {
            if(profile.user_id){
                var userid = profile.user_id;
                Child.find({par_id:userid}, function (err,child_fname) {
                    if (err)
                        res.send(err);
                        res.json(child_fname);
                });
            } else if(profile.emp_id){
                var crecheJwtString = req.cookies.Authorization_Creche.split(" ");
                var creche = verifyJwt(crecheJwtString[1]);
                var crecheid = creche.creche_id;
                Child.find({creche_id:crecheid}, function (err,child_fname) {
                    if (err)
                        res.send(err);
                        res.json(child_fname);
                });
            }
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

router.post('/addtoRoom', function(req, res, next){
        var child_id = req.body.C_id;
        var Creche_id = req.body.K_id;
        var TA = req.body.timeA;
        var TB = req.body.timeB;
        
        // Create new child object
       var newCLink = ChildLink();

        // If the logged in user is a parent, set its par_id
        newCLink.creche_id = Creche_id;
        newCLink.child_id = child_id;
        newCLink.timea = TA;
        newCLink.timeb = TB;
            newCLink.save(function(err, linkC) {
                if (err)
                    throw err;
                res.json({'success' : 'Child created'});
            });
});

router.get('/getRoomAChild', function(req, res, next){
        var cid = req.body.C_id;
        // Create new child objec
        ChildLink.find({'child_id':cid},function(err,rooms){
         if (err)
            res.send(err);
        res.json(rooms);
    });
        // If the logged in user is a parent, set its par_id
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

router.post('/tableRow', function(req, res, next){
    try {
        var childId = req.body.child_id;
        var rowNum = req.body.row_num;
        
        Child.findOne({_id:childId}, function (err,child) {
            if (err)
                res.send(err);
            if(child) {
                child.row_num = rowNum;
                child.save(function(err, child) {
                    if (err)
                        throw err;
                    res.json({"Success":"Table row " + rowNum + " updated"});
                });
            }
        });
    } catch (err) {
            res.json({
                "status": "error",
                "body": [
                    "Could not load attendance."
                ]
            });
        }

});


router.post('/attendance', function(req, res, next){
    try {
        // Get values from request
        var childId = req.body.child_id;
        var value = req.body.value;
        var date = req.body.date;
        
        // Check if there is an attendance record
        // for this child AND this date
        Attendance.findOne({child_id:childId, date:date}, function (err,record) {
            if (err)
                res.send(err);
            // If there is a record, update its value
            if(record) {
                record.attendance = value;
                record.save(function(err, record) {
                    if (err)
                        throw err;
                        res.json({'value' : record.attendance});
                });
            } else {
                // If there is no record, create one
                var newRecord = new Attendance();

                newRecord.child_id = childId;
                newRecord.attendance = value;
                newRecord.date = date;

                newRecord.save(function(err, record) {
                    if (err)
                        throw err;
                    res.json({'value' : record.attendance});
                });
                }
        });
    } catch (err) {
            res.json({
                "status": "error",
                "body": [
                    "Could not update attendance."
                ]
            });
        }
});

router.post('/getChildFromRow', function(req, res, next){
    var rowNum = req.body.row_num;
    try {
        Child.findOne({row_num:rowNum}, function (err,child) {
            if (err)
                res.send(err);
            if(child)
                res.json({"id":child._id});
        });   
    } catch (err) {
        res.json({
            "status": "error",
            "body": [
                "Could not update attendance."
            ]
        });
    }
});

router.post('/getAttendance', function(req, res, next){
    var childId = req.body.child_id;
    var date = req.body.date;
    console.log(req.body);
    try {
        Attendance.findOne({child_id:childId, date:date}, function (err,record) {
            if (err){
                res.send(err);
            }
            if(record)
                res.json({"value": record.attendance});
            else 
                res.json({"value":2});
        });   
    } catch (err) {
        res.json({
            "status": "error",
            "body": [
                "Could not get attendance."
            ]
        });
    }
});
function verifyJwt(jwtString) {
    var value = jwt.verify(jwtString, 'CSIsTheWorst');
    return value;
}

module.exports = router;