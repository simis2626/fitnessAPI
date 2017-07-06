/**
 * Created by Andromeda on 19/06/2017.
 */


var shared = require('./shared');
var shr = new shared();

shr.router.get('/stats/weights/:userid', function (req, res, next){

    shr.mngC.connect(shr.url, function (err, db) {
        var collection = db.collection('workout');
        console.log(req.params.userid);
        collection.aggregate([
                {'$facet':{'activityNames':[
                    {'$match': {"_userid": req.params.userid}},
                    {'$unwind': '$activities'},
                    {'$match': {"activities.activity.cardio": false}},
                    {
                        '$group': {
                            '_id': {
                                'name': '$activities.activity.name'
                            }
                        }
                    },
                    {'$sort': {'_id.name': 1}}
                ]







                    ,"personalBests":[



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







shr.router.get('/', function (req, res, next) {
    shr.mngC.connect(shr.url, function (err, db) {
        var collection = db.collection('activity');
        collection.find().sort({name: 1}).toArray(function (err, results) {
            res.json(results);
            db.close();
        })

    });


});


shr.router.post('/', function (req,res,next){
   shr.mngC.connect(shr.url, function (err, db){

       var coll = db.collection('activity');
       coll.insertOne(req.body, function (err, results) {
           if(err){
               console.log(err);
               res.statusCode(500).end();
           }else {
               res.json(results);

           }
           db.close();
       });
   }) ;





});

module.exports = shr.router;