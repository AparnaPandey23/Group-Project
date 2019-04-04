var express = require('express');
var router = express.Router();
var Room = require('../models/room');
var ChildLink = require('../models/childLink');

router.get('/newRoom', function(req, res, next) {
    res.render('roomSetup', { title: 'New Room', layout:"layout2" });
});
router.get('/listRoom', function(req, res, next) {
    res.render('roomList', { title: 'Rooms', layout:"layout2" });
});

//added
router.post('/newRoom', function(req, res, next) {
    var name = req.body.room_name;
    var C_id = req.body.creche_id;
    var cap = req.body.cap;
    var newRoom = new Room();
    newRoom.name = name;
    newRoom.creche_id = C_id;
    newRoom.capacity = cap;
    newRoom.save(function(err, room) {
                if (err){
                    throw err;
                }
                if(room){
                    res.json({"woo Sucsess":room});
                }
    });
});


router.get('/getRoom', function(req, res, next){
    var C_id = req.body.creche_id;
    Room.find({'creche_id':C_id},function(err,rooms){
         if (err)
            res.send(err);
        res.json(rooms);
    })
});

router.get('/getChildARoom', function(req, res, next){
        var cid = req.body.C_id;
        // Create new child objec
        ChildLink.find({'creche_id':cid},function(err,rooms){
         if (err)
            res.send(err);
        res.json(rooms);
    });
        // If the logged in user is a parent, set its par_id
});


module.exports = router;
