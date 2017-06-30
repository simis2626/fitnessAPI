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

shr.router.get('/activity/frequency/:userid', function (req, res, next){

    shr.mngC.connect(shr.url, function (err, db) {
            var collection = db.collection('workout');
            console.log(req.params.userid);
            collection.aggregate([
                {'$match': {"_userid": req.params.userid}},
                {'$unwind':'$activities'},
                {'$group':{'_id':{'id':'$activities.activity._id','name':'$activities.activity.name'}, 'count': {$sum: 1}}},
                    {'$sort':{'count':-1}},
                    {'$limit': 3}






                ],
                function (err, results) {
                    if (err){
                        console.log(err);
                        res.statusCode(500).end();
                    }else{
                        res.json(results);
                    }
                });
        }

        );





});

shr.router.get('/activity/stats/weights/:userid', function (req, res, next){

    shr.mngC.connect(shr.url, function (err, db) {
            var collection = db.collection('workout');
            console.log(req.params.userid);
            collection.aggregate([
                    {'$facet':{"personalBests":[



                    {'$match': {"_userid": req.params.userid}},
                    {'$unwind': '$activities'},
                    {'$match': {"activities.activity.cardio": false}},
                    {
                        '$group': {
                            '_id': {
                                'id': '$activities.activity._id',
                                'name': '$activities.activity.name',
                                'weight': '$activities.weight'
                            }, 'PbReps': {$max: '$activities.reps'}
                        }
                    },
                    {'$sort': {'PbReps': -1}}
                    ],
                'mostRecent': [{'$match': {"_userid": req.params.userid}},
                        {'$unwind': '$activities'},
                        {'$match': {"activities.activity.cardio": false}},
                        {
                            '$group': {
                                '_id': {
                                    'id': '$activities.activity._id',
                                    'name': '$activities.activity.name',
                                    'weight': '$activities.weight',
                                    'reps':'$activities.reps',
                                    'date': "$date",
                                    'year':{$year:'$date'},
                                    'day':{$dayOfYear:'$date'}
                                }

                        }},
                        {$sort: {"_id.year": -1, "_id.day": -1}},
                    {'$group':{'_id': {
                        'id':'$_id.id',
                        'name':"$_id.name",
                        'weight':'$_id.weight'},
                        'mostRecent':{'$first':'$_id.date'},
                        'reps':{'$first':'$_id.reps'}}}
                        ]}}]
                    , function (err1,results) {


                        if (err1) {
                            console.log(err1);
                            res.status(500).end();
                        } else {


                            res.json(results);
                        }
                    });

                });
        });


//TODO: remove this.
shr.router.get('/', function (req, res, next) {
    shr.mngC.connect(shr.url, function (err, db) {
        var collection = db.collection('workout');
        collection.find().sort({name: 1}).toArray(function (err, results) {
            res.json(results);
            db.close();
        })

    });


});






module.exports = shr.router;