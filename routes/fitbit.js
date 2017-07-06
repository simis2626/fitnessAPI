/**
 * Created by Andromeda on 19/06/2017.
 */


var shared = require('./shared');
var shr = new shared();






shr.router.get('/trigger/:userid', function(req,res,next){
   res.json({'status':'trigger received, starting API calls, will populate weigh-ins'});
   
   
   
   
    
    
});


shr.router.post('/', function (req,res,next){
   shr.mngC.connect(shr.url, function (err, db){

       var coll = db.collection('fitbit');
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