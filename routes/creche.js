var express = require('express');
var router = express.Router();
var Creche = require('../models/creche');

router.post('/newcreche', function(req, res, next){
    var name = req.body.creche_name;
    var email = req.body.creche_email; 
    var newcreche = new Creche ();
    // set the childs local credentials
    newcreche.name = name;
    newcreche.email = email;   
    newcreche.save(function(err, child) {
        if (err)
            throw err;
        res.json({'success' : 'Crecche Registered created'});

    });
});
