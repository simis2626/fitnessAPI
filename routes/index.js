var express = require('express');
var router = express.Router();
var mngC = require('mongodb').MongoClient;

var url = 'mongodb://docker.techtoedip.com:27017/fitnessApp';


/* GET home page. */
router.get('/', function(req, res, next) {
    mngC.connect(url, function (err, db) {
        var collection = db.collection('testing');

    });


    res.json({status: "ok"});
});

module.exports = router;
