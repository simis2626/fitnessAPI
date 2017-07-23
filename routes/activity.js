/**
 * Created by Andromeda on 19/06/2017.
 */
/*
 public _id:number,
 public name:string,
 public cardio:boolean*/

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
                    {
                        '$group': {
                            '_id': {
                                'name': '$activities.activity.name',
                                'cardio': '$activities.activity.cardio'
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
                                    'intensity':'$activities.intensity',
                                    'distance':'$activities.distance',
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
                            'reps':{'$first':'$_id.reps'},
                            'distance':{'$first':"$_id.distance"},
                            'intensity':{'$first':"$_id.intensity"}}}
                    ], 
                    "personalBestsCardio":[
                
                {'$match': {"_userid": req.params.userid}},
                    {'$unwind': '$activities'},
                    {'$match': {"activities.activity.cardio": true}},
                    {$sort:{'activities.duration':-1}},
                    
                    {'$group':{'_id': {
                            'duration':'$activities.duration', 'name':'$activities.activity.name'},'distance':{'$max':'$activities.distance'}}}
                            
                            ,
                    {
  '$bucket': {
      'groupBy':'$_id.duration',
      'boundaries': [0,7,13,18,23,28,33,38,43,48,53,58,63,68,73,78,80],
      'default': 'outOfBounds',
      'output': { 'results':{'$push':{'name':'$_id.name','distance':'$distance'}}}
}},

                    {'$unwind': '$results'},
                    
                    {'$group':{'_id': {
                            'duration':'$_id', 'name':'$results.name'},'distance':{'$max':'$results.distance'}}}
                            
                            

                ],
                    'mostRecentCardio': [{'$match': {"_userid": req.params.userid}},
                        {'$unwind': '$activities'},
                    {'$match': {"activities.activity.cardio": true}},
                        {
                            '$group': {
                                '_id': {
                                    'id': '$activities.activity._id',
                                    'name': '$activities.activity.name',
                                    'intensity':'$activities.intensity',
                                    'distance':'$activities.distance',
                                    'duration':'$activities.duration',
                                    'date': "$date",
                                    'year':{$year:'$date'},
                                    'day':{$dayOfYear:'$date'}
                                }

                            }},
                        {$sort: {"_id.year": -1, "_id.day": -1}},
                        {'$group':{'_id': {
                            'id':'$_id.id',
                            'name':"$_id.name",'duration':'$_id.duration'},
                            'mostRecent':{'$first':'$_id.date'},
                            'dayOfYear':{'$first':'$_id.day'},
                            'year':{'$first':'$_id.year'},
                            'distance':{'$first':"$_id.distance"},
                            'intensity':{'$first':"$_id.intensity"}}},
                    {
  '$bucket': {
      'groupBy':'$_id.duration',
      'boundaries': [0,7,13,18,23,28,33,38,43,48,53,58,63,68,73,78,80],
      'default': 'outOfBounds',
      'output': { 'results':{'$push':{'name':'$_id.name','distance':'$distance','year':'$year','dayOfYear':'$dayOfYear', 'date':'$mostRecent','intensity':'$intensity'}}}
}},{$unwind : '$results'},
{$sort:{'results.year':-1,'results.dayOfYear':-1}},
{'$group':{'_id': {
                            'duration':'$_id',
                            'name':"$results.name"},
                            'mostRecent':{'$first':'$results.date'},
                            'dayOfYear':{'$first':'$results.dayOfYear'},
                            'year':{'$first':'$results.year'},
                            'distance':{'$first':"$results.distance"},
                            'intensity':{'$first':"$results.intensity"}}},

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
        var insertDoc = req.body;
        
       var coll = db.collection('activity');
       coll.insertOne(insertDoc, function (err, results) {
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