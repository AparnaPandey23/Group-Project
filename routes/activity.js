var express = require('express');
var router = express.Router();

/* GET stayConnected page. */
router.get('/addActivity', function(req, res, next) {
    try {
      var userJwtString = req.cookies.Authorization.split(" ");
      var profile = verifyJwt(userJwtString[1]);
      console.log(profile);
      if (profile) {
          
          if(profile.user_id){
              res.render('addActivity', { title: 'View Activity' ,layout: 'layout2'}); 
          } else if(profile.emp_id){
              res.render('addActivity', { title: 'Pick an Activity' ,layout: 'layout3'});                
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


/* GET stayConnected page. */
router.get('/stayConnected', function(req, res, next) {
  try {
    var userJwtString = req.cookies.Authorization.split(" ");
    var profile = verifyJwt(userJwtString[1]);
    
    if (profile) {
        if(profile.user_id){
            res.render('stayConnected', { title: 'Stay Connected' ,layout: 'layout2'}); 
        } else if(profile.emp_id){
            res.render('stayConnected', { title: 'Stay Connected' ,layout: 'layout3'});                
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

/* GET privacy page. */
router.get('/privacy', function(req, res, next) {
  try {
    var userJwtString = req.cookies.Authorization.split(" ");
    var profile = verifyJwt(userJwtString[1]);
    
    if (profile) {
        if(profile.user_id){
            res.render('privacy', { title: 'Privacy' ,layout: 'layout2'}); 
        } else if(profile.emp_id){
            res.render('privacy', { title: 'Privacy' ,layout: 'layout3'});                
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

module.exports = router;