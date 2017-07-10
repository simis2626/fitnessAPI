/**
 * Created by Andromeda on 19/06/2017.
 */

/*globals res1 */
var querystring = require('querystring');
var http = require('http');
var http1 = require('https');
var shared = require('./shared');
var shr = new shared();




const getAuthToken = function(_userid){
    shr.mngC.connect(shr.url, function (err, db) {
        var coll = db.collection('fitbit');
        console.log(req.params.userid);
        coll.find({'_userid' : _userid}).toArray(function (err,results) {
            if(results[0].expireTime.valueOf() > Date.now()){
                
            }
            
    
    
    
    
    
    
    
});});};












shr.router.post('/trigger/:userid', function(req,res,next){
    shr.mngC.connect(shr.url, function (err, db) {
        var coll = db.collection('fitbit');
        console.log(req.params.userid);
        coll.find({'_userid' : req.params.userid}).toArray(function (err,results) {
            if (err) {
                console.log(err);
                res.statusCode(500).end();
            } else {
                
                var dtMonth = new Date().getMonth()+1
                var dtMonth = dtMonth >9 ? dtMonth : '0' + dtMonth;
    var post_options = {
        host: 'api.fitbit.com',
        port: '443',
        path: '/1/user/-/body/log/weight/date/' + new Date().getFullYear() +'-'+ dtMonth +'-'+ new Date().getDate() + '/1m.json',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + results[0].access_token
        }
    };
    console.log(post_options);         
    http1.get(post_options, function (res1) {

        var body = '';
        res1.on('data', function (chunk) {
            body += chunk;
        });
        res1.on('end', function () {
            var collweight = db.collection('fitbitWeight');
            var JSONbody = JSON.parse(body)
            
            
            collweight.insertMany(JSONbody.weight,null, function(err2, results3){
                res.json(results3);
                db.close();
            });
        });
        res1.on('error', function (err) {
            console.log(err);
            db.close();
        });
    });
                
                
                
                

            }
            
        });
    });




    
    
});


shr.router.post('/', function (req, res1, next) {
    // Build the post string from an object
    var post_data = querystring.stringify({
        'clientId': '228GFT',
        'grant_type': "authorization_code",
        "code": req.body.code,
        'redirect_uri': 'http://fitness.techtoedip.com:81/fitbit_success'

    });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'api.fitbit.com',
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
          shr.mngC.connect(shr.url, function (err, db) {
              var chunk1 = JSON.parse(chunk);
              chunk1._userid = req.body._userid;
              chunk1.expireTime = new Date(Date.now() + chunk1.expires_in);
              var coll = db.collection('fitbit');
              coll.findOneAndReplace({_userid:chunk1._userid},chunk1,{upsert:true}, function (err, results) {
                  if (err) {
                      console.log(err);
                      res1.statusCode(500).end();
                  } else {
                      res1.json(results);

                  }
                  db.close();
              });
          });
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();






});


module.exports = shr.router;