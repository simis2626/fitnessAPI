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
        collection.find({}, function (err, results) {
            console.log(results);
            res.json(results);
        })

    });


});


module.exports = shr.router;