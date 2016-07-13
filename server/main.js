var config = require('config');
var process = require('process');
process.env.TZ = 'Europe/Berlin';

var express = require('express');
var models = require("./domain/models");
var rides = require("./services/rides");

var app = express();

app.get('/results', function (req, res) {
    models.waitTime.all().then(function (times) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(times));
    });
});

app.get('/api/current_waitingtimes.json', function (req, res) {
    models.waitTime.all().then(function (waitTimes) {
        rides.importWaitingTimes(waitTimes);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rides.data()));
    });
});


app.use(express.static('./../public'));

app.listen(config.get('port'), function () {
    console.log('Server is running on port: ' + config.get('port'));
});

