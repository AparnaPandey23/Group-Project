var express = require('express');
var router = express.Router();

/* GET add activity page. */
router.get('/addActivity', function(req, res, next) {
    res.render('addActivity', { title: 'Pick an Activity', layout: "layout2" });
  });


/* GET stayConnected page. */
router.get('/stayConnected', function(req, res, next) {
  res.render('stayConnected', { title: 'Stay Connected' , layout: "layout2"});
});

/* GET privacy page. */
router.get('/privacy', function(req, res, next) {
  res.render('privacy', { title: 'privacy' , layout: "layout2"});
});

module.exports = router;