var shared = require('./shared');
var shr = new shared();


/* GET home page. */
shr.router.get('/', function (req, res, next) {
    shr.mngC.connect(shr.url, function (err, db) {
        var collection = db.collection('testing');

    });


    res.json({status: "ok"});
});

module.exports = shr.router;
