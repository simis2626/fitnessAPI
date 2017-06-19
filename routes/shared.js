/**
 * Created by Andromeda on 19/06/2017.
 */



function sharedstuff() {
    this.express = require('express');
    this.router = this.express.Router();
    this.mngC = require('mongodb').MongoClient;
    this.url = 'mongodb://docker.techtoedip.com:27017/fitnessApp';
}


module.exports = sharedstuff;