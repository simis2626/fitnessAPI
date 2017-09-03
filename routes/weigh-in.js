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
                    }, {
                        $sort: {'date': 1}
                    }
                ]
                , function (err2, docs2) {
                    if (err2) {
                        console.log(err2);
                        return;
                    }
                    db.close();
                    docs2.forEach(function (obj) {
                        obj.time = "fitbit";
                        obj.date = new Date(obj.date);
                    });
                    docs.forEach(function (obj) {
                        obj.date = new Date(obj.date);
                    });
                    results = docs.concat(docs2);
                    var filterResults = results.filter(function (obj) {
                        return obj.date.valueOf() >= new Date("2017-08-25").valueOf();
                    });

                    var compfunc = function (dt1, dt2) {
                        return new Date(dt1.date).valueOf() < new Date(dt2.date).valueOf() ? -1 : 1;
                    };

                    filterResults.sort(compfunc);

                    var augArray = filterResults.map(function (obj, ndx, arr) {
                        if (ndx == 0) {
                            obj.progress = 0;
                            return obj;
                        }
                        obj.progress = arr[0].weight - obj.weight;
                        return obj;
                    });


                    res.json(augArray);
                });

        });
    });
});

module.exports = shr.router;