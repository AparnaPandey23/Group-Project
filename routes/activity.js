var express = require('express');
var router = express.Router();

/* GET add activity page. */
router.get('/addActivity', function(req, res, next) {
    res.render('addActivity', { title: 'New Activity' });
  });

module.exports = router;