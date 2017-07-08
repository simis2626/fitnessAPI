/**
 * Created by Andromeda on 19/06/2017.
 */

var querystring = require('querystring');
var http = require('http');
var http1 = require('https');
var shared = require('./shared');
var shr = new shared();



shr.router.get('/trigger/:userid', function(req,res,next){
   res.json({'status':'trigger received, starting API calls, will populate weigh-ins'});
   
   
   
   
    
    
});

shr.router.post('/', function (req,res,next){
    // Build the post string from an object
  var post_data = querystring.stringify({
       'clientId':'228GFT',
'grant_type':"authorization_code",
  "redirect_uri":"http%3A%2F%2Ffitness.techtoedip.com%3A81%2Ffitbit_success" ,
"code":req.body.code
     
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'https://api.fitbit.com',
      port: '443',
      path: '/oauth2/token',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic MjI4R0ZUOmRhNmI2MGJiMWU0M2U4NTI3NTdjOTJhYmZiOWUxZTg3'
      }
  };

  // Set up the request
  var post_req = http1.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();
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

shr.router.get('/', function (req,res,next){
    // Build the post string from an object
  var post_data = querystring.stringify({
       'clientId':'228GFT',
'grant_type':"authorization_code",
  "redirect_uri":"http%3A%2F%2Ffitness.techtoedip.com%3A81%2Ffitbit_success" ,
"code":'01bafb9bf5954bc3d64917d5033a8fb5c1ea8ea1'
     
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'https://api.fitbit.com',
      port: '443',
      path: '/oauth2/token',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic MjI4R0ZUOmRhNmI2MGJiMWU0M2U4NTI3NTdjOTJhYmZiOWUxZTg3'
      }
  };

  // Set up the request
  var post_req = http1.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();
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