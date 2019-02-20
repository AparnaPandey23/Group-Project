var express = require('express');
var router = express.Router();
var Child = require('../models/child');

/* GET child list page. */
router.get('/children', function(req, res, next) {
  res.render('childList', { title: 'Children' });
});

/* GET add child page. */
router.get('/addChild', function(req, res, next) {
  res.render('addChild', { title: 'New Child' });
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addchild', function(req, res, next){
    var jwtString  = req.cookies.parid;
    var parident = jwtString;
    var childfname = req.body.child_fname;
    var childlname = req.body.child_lname; 
    var Dob = req.body.dob;
    var par = req.body.parName;
    var newchild = new Child();
    // set the childs local credentials
    newchild.child_fname = childfname ;
    newchild.child_lname = childlname;   
    newchild.dob = Dob;
    newchild.par_id = parident;
    newchild.parName = par;
    newchild.save(function(err, child) {
        if (err)
            throw err;
        res.json({'success' : 'Child created'});

    });
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

router.post('/getchildren', function(req, res, next){
    Child.find({par_id:req.body.userid}, function (err,child_fname) {
        if (err)
            res.send(err);
        res.json(child_fname);
    });
});

// deleate the Child Request need to pass in the id of the child to be deleated
router.delete('/delchild/:id', function(req, res ,next){
    var id = req.params.id; 
    Child.remove({_id:id}, function(err, child_fname){ /*Deleates the Comment by Id*/
        if(err)
            res.send(err);
        res.json(child_fname); /* Returns the list of comments */
    });
});

module.exports = router;