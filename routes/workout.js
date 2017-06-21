/**
 * Created by Andromeda on 19/06/2017.
 */
/*
 public _id?:number,
 public _userid?: string,
 public duration?:number,
 public date?:Date,
 public stretchesDone?:boolean,
 public activities?:ActivityWO[]*/

var shared = require('./shared');
var shr = new shared();

shr.router.post('/', function (req, res, next) {

    var insertDoc = req.body;
    insertDoc.date = new Date(insertDoc.date);
    for (var i = 0; i < insertDoc.activities.length; i++) {
        insertDoc.activities[i].date = insertDoc.date;
    }



    shr.mngC.connect(shr.url, function (err, db) {
        var collection = db.collection('workout');
        collection.insertOne(insertDoc, function (err, docs) {
            res.json({saved: "true"});
        });

    });


});


shr.router.get('/from/:dtStart/to/:dtEnd:', function (req, res, next) {

    shr.mngC.connect(shr.url, function (err, db) {
        var collection = db.collection('workout');
        collection.find({}, function (err, docs) {


        });

    });

});








module.exports = shr.router;