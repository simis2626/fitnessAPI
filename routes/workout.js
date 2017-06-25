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


shr.router.post('/from/:strStart/to/:strEnd', function (req, res, next) {

    var dtStart = new Date(req.params.strStart);
    var dtEnd = new Date(req.params.strEnd);


    shr.mngC.connect(shr.url, function (err, db) {
        var collection = db.collection('workout');
        collection.find({date: {$gte: dtStart, $lte: dtEnd},_userid:req.body._userid}).toArray(function (err, docs) {
            if (err) {
                console.log(err);
            }
            //console.log(docs);
            res.json(docs);
            res.end();

        });

    });

});


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









module.exports = shr.router;