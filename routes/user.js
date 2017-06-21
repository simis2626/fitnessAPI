/**
 * Created by Andromeda on 19/06/2017.
 */
/*
 public _id?: number,
 public _userid?: string,
 public date?: Date,
 public weight?: number,
 public time?: string*/


var shared = require('./shared');
var shr = new shared();

shr.router.post('/', function (req, res, next) {
    var insertDoc = req.body;
    insertDoc.dateSaved = new Date();


    shr.mngC.connect(shr.url, function (err, db) {
        var collection = db.collection('user');
        collection.insertOne(insertDoc, function (err, docs) {
            res.json({saved: "true"});
        });

    });


});


module.exports = shr.router;