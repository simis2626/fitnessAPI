/**
 * Created by Andromeda on 19/06/2017.
 */
/*
 public _userid?: string,
 public date?: Date,
 public weight?: number,
 public time?: string*/


var shared = require('./shared');
var shr = new shared();

shr.router.post('/', function (req, res, next) {
    var insertDoc = req.body;
    insertDoc.date = new Date(insertDoc.date);



    shr.mngC.connect(shr.url, function (err, db) {
        var collection = db.collection('weighin');
        collection.insertOne(insertDoc, function (err, docs) {
            res.json({saved: "true"});
        });

    });


});


shr.router.get('/:userid', function (req, res, next) {
    shr.mngC.connect(shr.url, function (err, db) {
        var collection = db.collection('weighin');
        collection.find({_userid: req.params.userid}).toArray(function (err, docs) {
            var coll2 = db.collection('fitbitWeight');
            coll2.aggregate([
                    {'$match': {'_userid': req.params.userid}},
                    {
                        '$group': {
                            '_id': '$logId',
                            'weight': {'$first': '$weight'},
                            '_userid': {'$first': '$_userid'},
                            'date': {'$first': '$date'},
                            'bmi': {'$first': '$bmi'}
                        }
                    }
                ]
                , function (err2, docs2) {
                    docs2.forEach(function (obj) {
                        obj.time = "fitbit";
                    });
                    docs.forEach(function (obj) {
                        obj.date = new Date(obj.date);
                    });
                    results = docs.concat(docs2);
                    res.json(results);
                });

        });
    });
});

module.exports = shr.router;