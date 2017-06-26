/**
 * Created by Andromeda on 19/06/2017.
 */
/*
 public _id:number,
 public name:string,
 public cardio:boolean*/

var shared = require('./shared');
var shr = new shared();

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