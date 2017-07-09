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
    shr.mngC.connect(shr.url, function (err, db) {
        var coll = db.collection('fitbit');
        coll.find({'_userid': req.params._userid}).toArray(function (results) {
            if (err) {
                console.log(err);
                res1.statusCode(500).end();
            } else {
                res1.json(results);

            }
            db.close();
        });
    });


    var post_options = {
        host: 'api.fitbit.com',
        port: '443',
        path: '/1/user/-/body/log/weight/date/2017-07-01/2017-07-09.json',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1VjQyTUYiLCJhdWQiOiIyMjhHRlQiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyd2VpIHJociByYWN0IHJwcm8iLCJleHAiOjE0OTk2MTMwNDAsImlhdCI6MTQ5OTU4NDI0MH0.vvymGzVj8YR-iiMQ8L5hei-sar1_NfK-1fblhrddNVo'
        }
    };


    http1.get(post_options, function (res1) {

        var body = '';
        res1.on('data', function (chunk) {
            body += chunk;
        });
        res1.on('end', function () {
            console.log(body);
        });
        res1.on('error', function (err) {
            console.log(err);
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
              var coll = db.collection('fitbit');
              coll.insertOne(chunk1, function (err, results) {
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