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


var sausage = function () {

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
};


var insertWorkouts = function () {
    shr.mngC.connect(shr.url, function (err, db) {
        var collC = db.collection('workout');
        var i;
        for (i = 0; i < 1000; i++) {
            collC.insertMany([
                {
                    "_userid": "google-oauth2|109221858942102695401",
                    "duration": 26,
                    "date": new Date("2017-06-24T00:00:00.000Z"),
                    "stretchesDone": true,
                    "averageEffort": 86,
                    "activities": [
                        {
                            "_id": null,
                            "activity": {
                                "_id": "5949074096fc9c05c40016fb",
                                "name": "Eleptical",
                                "cardio": true
                            },
                            "date": new Date("2017-06-24T00:00:00.000Z"),
                            "duration": "26",
                            "intensity": "5",
                            "weight": null,
                            "reps": null,
                            "distance": "2000"
                        }
                    ]
                },
                {
                    "_userid": "google-oauth2|109221858942102695401",
                    "duration": 39,
                    "date": new Date("2017-06-26T00:00:00.000Z"),
                    "stretchesDone": null,
                    "averageEffort": null,
                    "activities": [
                        {
                            "_id": null,
                            "activity": null,
                            "date": new Date("2017-06-26T00:00:00.000Z"),
                            "duration": null,
                            "intensity": null,
                            "weight": null,
                            "reps": null,
                            "distance": null
                        }
                    ]
                },
                {
                    "_userid": "google-oauth2|109221858942102695401",
                    "duration": 35,
                    "date": new Date("2017-06-27T00:00:00.000Z"),
                    "stretchesDone": true,
                    "averageEffort": 96,
                    "activities": [
                        {
                            "_id": null,
                            "activity": {
                                "_id": "5949074096fc9c05c40016fb",
                                "name": "Eleptical",
                                "cardio": true
                            },
                            "date": new Date("2017-06-27T00:00:00.000Z"),
                            "duration": "35",
                            "intensity": "5",
                            "weight": null,
                            "reps": null,
                            "distance": "5000"
                        }
                    ]
                },
                {
                    "_userid": "google-oauth2|109221858942102695401",
                    "duration": 100,
                    "date": new Date("2017-06-27T00:00:00.000Z"),
                    "stretchesDone": true,
                    "averageEffort": 70,
                    "activities": [
                        {
                            "_id": null,
                            "activity": {
                                "_id": "5949074096fc9c05c40016fa",
                                "name": "Bike",
                                "cardio": true
                            },
                            "date": new Date("2017-06-27T00:00:00.000Z"),
                            "duration": "50",
                            "intensity": "1",
                            "weight": null,
                            "reps": null,
                            "distance": "50"
                        },
                        {
                            "_id": null,
                            "activity": {
                                "_id": "5949074096fc9c05c40016fb",
                                "name": "Eleptical",
                                "cardio": true
                            },
                            "date": new Date("2017-06-27T00:00:00.000Z"),
                            "duration": "20",
                            "intensity": "3",
                            "weight": null,
                            "reps": null,
                            "distance": "10"
                        }
                    ]
                },
                {
                    "_userid": "google-oauth2|109221858942102695401",
                    "duration": 500,
                    "date": new Date("2017-06-29T00:00:00.000Z"),
                    "stretchesDone": true,
                    "averageEffort": 25,
                    "activities": [
                        {
                            "_id": null,
                            "activity": {
                                "_id": "5949074096fc9c05c4001701",
                                "name": "Bilateral rope pulldown",
                                "cardio": false
                            },
                            "date": new Date("2017-06-29T00:00:00.000Z"),
                            "duration": "100",
                            "intensity": null,
                            "weight": "50",
                            "reps": "2500",
                            "distance": null
                        },
                        {
                            "_id": null,
                            "activity": {
                                "_id": "5949074096fc9c05c4001701",
                                "name": "Bilateral rope pulldown",
                                "cardio": false
                            },
                            "date": new Date("2017-06-29T00:00:00.000Z"),
                            "duration": "20",
                            "intensity": null,
                            "weight": "20",
                            "reps": "20",
                            "distance": null
                        }
                    ]
                },
                {
                    "_userid": "google-oauth2|109221858942102695401",
                    "duration": 900,
                    "date": new Date("2017-06-30T00:00:00.000Z"),
                    "stretchesDone": true,
                    "averageEffort": 60,
                    "activities": [
                        {
                            "_id": null,
                            "activity": {
                                "_id": "5949074096fc9c05c40016fa",
                                "name": "Bike",
                                "cardio": true
                            },
                            "date": new Date("2017-06-30T00:00:00.000Z"),
                            "duration": "25",
                            "intensity": "5",
                            "weight": null,
                            "reps": null,
                            "distance": "1000000"
                        }
                    ]
                },
                {
                    "_userid": "google-oauth2|109221858942102695401",
                    "duration": 200,
                    "date": new Date("2017-06-27T00:00:00.000Z"),
                    "stretchesDone": true,
                    "averageEffort": 90,
                    "activities": [
                        {
                            "_id": null,
                            "activity": {
                                "_id": "5949074096fc9c05c4001705",
                                "name": "Burpees",
                                "cardio": false
                            },
                            "date": new Date("2017-06-27T00:00:00.000Z"),
                            "duration": "20",
                            "intensity": null,
                            "weight": "2",
                            "reps": "00002",
                            "distance": null
                        }
                    ]
                },
                {
                    "_userid": "google-oauth2|109221858942102695401",
                    "duration": 36,
                    "date": new Date("2017-06-28T00:00:00.000Z"),
                    "stretchesDone": true,
                    "averageEffort": 25,
                    "activities": [
                        {
                            "_id": null,
                            "activity": {
                                "_id": "59537d0ff72a500024cabf56",
                                "name": "PT session ",
                                "cardio": true
                            },
                            "date": new Date("2017-06-28T00:00:00.000Z"),
                            "duration": "45",
                            "intensity": "4",
                            "weight": null,
                            "reps": null,
                            "distance": "5000"
                        }
                    ]
                },
                {
                    "_userid": "google-oauth2|109221858942102695401",
                    "duration": 50,
                    "date": new Date("2017-06-28T00:00:00.000Z"),
                    "stretchesDone": true,
                    "averageEffort": 25,
                    "activities": [
                        {
                            "_id": null,
                            "activity": {
                                "_id": "59537d0ff72a500024cabf56",
                                "name": "PT session ",
                                "cardio": true
                            },
                            "date": new Date("2017-06-28T00:00:00.000Z"),
                            "duration": "300",
                            "intensity": "8",
                            "weight": null,
                            "reps": null,
                            "distance": "60"
                        }
                    ]
                },
                {
                    "_userid": "google-oauth2|109221858942102695401",
                    "duration": 25,
                    "date": new Date("2017-06-28T00:00:00.000Z"),
                    "stretchesDone": true,
                    "averageEffort": 25,
                    "activities": [
                        {
                            "_id": null,
                            "activity": {
                                "_id": "59537d0ff72a500024cabf56",
                                "name": "PT session ",
                                "cardio": true
                            },
                            "date": new Date("2017-06-28T00:00:00.000Z"),
                            "duration": "25",
                            "intensity": "5",
                            "weight": null,
                            "reps": null,
                            "distance": "30000"
                        }
                    ]
                },
                {
                    "_userid": "google-oauth2|109221858942102695401",
                    "duration": 10,
                    "date": new Date("2017-06-29T00:00:00.000Z"),
                    "stretchesDone": null,
                    "averageEffort": 0,
                    "activities": [
                        {
                            "_id": null,
                            "activity": {
                                "_id": "595636570df380002412321f",
                                "name": "testing1",
                                "cardio": false
                            },
                            "date": new Date("2017-06-29T00:00:00.000Z"),
                            "duration": "100",
                            "intensity": null,
                            "weight": "5",
                            "reps": "3",
                            "distance": null
                        }
                    ]
                },
                {
                    "_userid": "google-oauth2|109221858942102695401",
                    "duration": 10,
                    "date": new Date("2017-04-12T00:00:00.000Z"),
                    "stretchesDone": null,
                    "averageEffort": 9,
                    "activities": [
                        {
                            "_id": null,
                            "activity": {
                                "_id": "595636570df380002412321f",
                                "name": "testing1",
                                "cardio": false
                            },
                            "date": new Date("2017-04-12T00:00:00.000Z"),
                            "duration": "15",
                            "intensity": null,
                            "weight": "5",
                            "reps": "900",
                            "distance": null
                        },
                        {
                            "_id": null,
                            "activity": {
                                "_id": "595636570df380002412321f",
                                "name": "testing1",
                                "cardio": false
                            },
                            "date": new Date("2017-04-12T00:00:00.000Z"),
                            "duration": "20",
                            "intensity": null,
                            "weight": "15",
                            "reps": "25",
                            "distance": null
                        }
                    ]
                }
            ], function (err, results) {

            });
        }
        db.close();


    });
};


insertWorkouts();
return;


