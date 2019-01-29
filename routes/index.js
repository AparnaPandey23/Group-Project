var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET child list page. */
router.get('/children', function(req, res, next) {
  res.render('childList', { title: 'Children' });
});

/* GET add child page. */
router.get('/addChild', function(req, res, next) {
  res.render('addChild', { title: 'New Child' });
});

module.exports = router;
