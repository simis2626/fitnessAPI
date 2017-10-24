/**
 * Created by Andromeda on 19/06/2017.
 */
var jwt = require('jsonwebtoken');


function sharedstuff() {
    this.token = jwt.sign({}, 'testFitnessAPISig');
    this.express = require('express');
    this.router = this.express.Router();
    this.mngC = require('mongodb').MongoClient;
    this.url = 'mongodb://docker.techtoedip.com:27017/fitnessApp';
}


module.exports = sharedstuff;