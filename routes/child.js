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
    var childfname = req.body.child_fname;
    var childlname = req.body.child_lname; 
    var Dob = req.body.dob;
    var par = req.body.parName;
    var newchild = new Child();
    // set the childs local credentials
    newchild.child_fname = childfname ;
    newchild.child_lname = childlname;   
    newchild.dob = Dob;
    newchild.parName = par;
    newchild.save(function(err, child) {
        if (err)
            throw err;
        res.json({'success' : 'Child created'});

    });
});


module.exports = router;