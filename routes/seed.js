/**
 * Created by Andromeda on 19/06/2017.
 * Used to place inital information in the database.
 *
 */
/**public name:string,
 *  public cardio:boolean
 */


var shared = require('./shared');
var shr = new shared();

shr.mngC.connect(shr.url, function (err, db) {

    var collC = db.collection('activity');
    collC.insertMany([
        {name: "Treadmill", cardio: true},
        {name: "Bike", cardio: true},
        {name: "Eleptical", cardio: true},
        {name: "Rowing", cardio: true},
        {name: "Stepper", cardio: true},
        {name: "Skipping", cardio: true},
        {name: "Boxing", cardio: true},
        {name: "Sidesteps", cardio: true},
        {name: "Bilateral rope pulldown", cardio: false},
        {name: "Squats", cardio: false},
        {name: "Pushups", cardio: false},
        {name: "Crunches", cardio: false},
        {name: "Burpees", cardio: false},
        {name: "Overhead press", cardio: false},
        {name: "Bicep curl", cardio: false},
        {name: "Weighted punches", cardio: false},
        {name: "Lunges", cardio: false},
        {name: "Leg press", cardio: false},
        {name: "Calf raises", cardio: true}
    ], function (err, results) {
        console.log(results);
        db.close();
    });


});

