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
        collection.find({date: {$gte: dtStart, $lte: dtEnd}, _userid: req.body._userid}).toArray(function (err, docs) {
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

shr.router.get('/activity/frequency/:userid', function (req, res, next) {

    shr.mngC.connect(shr.url, function (err, db) {
            var collection = db.collection('workout');
            console.log(req.params.userid);
            collection.aggregate([
                    {'$match': {"_userid": req.params.userid}},
                    {'$unwind': '$activities'},
                    {
                        '$group': {
                            '_id': {'id': '$activities.activity._id', 'name': '$activities.activity.name'},
                            'count': {$sum: 1}
                        }
                    },
                    {'$sort': {'count': -1}},
                    {'$limit': 3}


                ],
                function (err, results) {
                    if (err) {
                        console.log(err);
                        res.statusCode(500).end();
                    } else {
                        res.json(results);
                    }
                });
        }
    );


});


shr.router.get('/hist/:_userid/:returnNum', function (req, res, next) {
    shr.mngC.connect(shr.url, function (err, db) {
        var collection = db.collection('workout');
        console.log(req.params);
        collection.aggregate([
                {
                    $facet: {
                        'weekData': [
                            {
                                '$project': {
                                    'duration': 1,
                                    '_userid': 1,
                                    date: 1,
                                    stretchesDone: 1,
                                    year: {$year: '$date'},
                                    week: {$week: '$date'}

                                }
                            },
                            {
                                $group: {
                                    "_id": {year: '$year', week: '$week', _userid: '$_userid'},
                                    'count': {$sum: 1},
                                    'stretches': {$sum: {$cond: ['$stretchesDone', 1, 0]}}
                                }
                            },
                            {$project: {'stretches': 1, 'count': 1, 'stretchesBool': {$eq: ['$stretches', '$count']}}},
                            {$sort: {'_id.year': -1, '_id.week': -1}},
                            {$match: {'_id._userid': req.params._userid}},
                            {$limit: parseInt(req.params.returnNum)}]
                        ,

                        'dayData': [
                            {
                                '$project': {
                                    'duration': 1,
                                    '_userid': 1,
                                    'date': 1,
                                    'stretchesDone': 1,
                                    'year': {$year: '$date'},
                                    'week': {$week: '$date'},
                                    'dayOfYear': {$dayOfYear: '$date'},
                                    'tempDayOfWeek': {$add: [{$dayOfWeek: '$date'}, -1]}

                                }
                            },
                            {
                                '$project': {
                                    'duration': 1,
                                    '_userid': 1,
                                    'date': 1,
                                    'stretchesDone': 1,
                                    'year': 1,
                                    'week': {$cond: [{$eq: ['$tempDayOfWeek', 0]}, {$subtract: ['$week', -1]}, '$week']},
                                    'dayOfYear': 1,
                                    'dayOfWeek': {$cond: [{$eq: ['$tempDayOfWeek', 0]}, 7, '$tempDayOfWeek']}


                                }
                            }
                                            ,
                            {
                                $group: {
                                    "_id": {
                                        year: '$year',
                                        week: '$week',
                                        dayOfYear: '$dayOfYear',
                                        dayOfWeek: '$dayOfWeek',
                                        _userid: '$_userid',
                                        date: '$date'
                                    },
                                    'count': {$sum: 1},
                                    'duration': {$sum: '$duration'},
                                    'stretches': {$sum: {$cond: ['$stretchesDone', 1, 0]}}
                                }
                            },
                                            {$project:{'stretches':1,'count':1,'duration':1, 'stretchesBool':{$eq:['$stretches','$count']} }},
                            {$sort: {'_id.year': -1, '_id.dayOfYear': -1}},
                                            {$match:{'_id._userid':req.params._userid}},
                            {$limit: parseInt(req.params.returnNum)},
                            {$sort: {'_id.year': 1, '_id.dayOfYear': 1}}]
                    }
                }


                    ]


            , function (err1, results) {


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