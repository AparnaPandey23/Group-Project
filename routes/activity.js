var express = require('express');
var router = express.Router();

/* GET add activity page. */
router.get('/addActivity', function(req, res, next) {
    res.render('addActivity', { title: 'New Activity' });
  });


/* GET stayConnected page. */
router.get('/stayConnected', function(req, res, next) {
  res.render('stayConnected', { title: 'stay Connected' });
});

module.exports = router;