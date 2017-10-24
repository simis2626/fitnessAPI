/**
 * Created by Andromeda on 19/06/2017.
 */
/*
 public _id?: number,
 public _userid?: string,
 public date?: Date,
 public weight?: number,
 public time?: string*/


var shared = require('./shared');
var shr = new shared();

var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth();
var client = new auth.OAuth2('190002128182-ei7n8eh95nourb0sdcoh2o12cindv9rp.apps.googleusercontent.com', '', '');



shr.router.post('/', function (req, res, next) {
    console.log('here');
    var token = req.get('Authorization');

    if (token) {
        token = token.slice(7);
        console.log("google-verification");
        client.verifyIdToken(
            token,
            '190002128182-ei7n8eh95nourb0sdcoh2o12cindv9rp.apps.googleusercontent.com', function (err, login) {
                if (login) {
                    res.json({access_token:shr.token});
                }
                else {
                    res.status(401).send('API Key is not valid');
                }
            })


    } else {
        res.status(401);
        res.send('API requires Google JWT');
    }

    var insertDoc = req.body;
    insertDoc.dateSaved = new Date();


    shr.mngC.connect(shr.url, function (err, db) {
        var collection = db.collection('user');
        collection.insertOne(insertDoc, function (err, docs) {
            return;
        });
        return;
    });


});


module.exports = shr.router;