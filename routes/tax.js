/**
 * Created by Andromeda on 19/06/2017.
 */
/*
 public _id:number,
 public name:string,
 public cardio:boolean*/

var mongoObject = require('mongodb').ObjectID;
var shared = require('./shared');
var shr = new shared();
shr.router.get('/groupBy/day', function (req, res, next) {
    shr.mngC.connect(shr.url, function (err, db) {
        var collection = db.collection('taxTrans');
        collection.aggregate([{'$group':{
            '_id':{'Date':'$Date',Day:'$Day','Year-Month':'$Year-Month'}
            ,id:{$push:'$_id'}
            ,Details:{$push:'$Details'}
            ,Cost:{$push:'$Cost'}
            ,Account:{$push:'$Account'}
            ,Category:{$push:'$Category'}
            ,claim:{$push:'$claim'}
            ,note:{$push:'$note'}}
        },{$sort:{'_id.Date':1}}], function(err,results){
            if (err) {
                        console.log(err);
                        res.statusCode(500).end();
                    } else {
                        res.json(results);
                    }
            
            
            
        });

    });


});

shr.router.get('/', function (req, res, next) {
    shr.mngC.connect(shr.url, function (err, db) {
        var collection = db.collection('taxTrans');
        collection.find().sort({Date: 1}).toArray(function (err, results) {
            res.json(results);
            db.close();
        })

    });


});


shr.router.post('/', function (req, res, next) {
    shr.mngC.connect(shr.url, function (err, db) {
        var insertDoc = req.body;
        insertDoc._id =  new mongoObject.ObjectId(insertDoc._id);

        var coll = db.collection('taxTrans');
        coll.insertOne(insertDoc, function (err, results) {
            if (err) {
                console.log(err);
                res.statusCode(500).end();
            } else {
                res.json(results);

            }
            db.close();
        });
    });


});

module.exports = shr.router;