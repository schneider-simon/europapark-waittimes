var process = require('process');
process.env.TZ = 'Europe/Berlin';

var config = require('config');

var express = require('express');
var Sniffer = require("./classes/Sniffer");
var models = require("./domain/models");
var rides = require("./services/rides");
var moment = require('moment');


var app = express();

var sniffer = new Sniffer(config.get('mode'));

sniffer.run();

setInterval(() => {
    console.log('rerun');


    if(!inTimeFrame()){
        console.log('SKIP: Hour ' +  moment().hours() + ' not in time frame.');
        return;
    }

    sniffer.run();
}, config.get('intervalSeconds') * 1000);

function inTimeFrame(){
    var currentHour = moment().hours();
    return currentHour >= config.get('timeFrame.start') && currentHour <= config.get('timeFrame.end');
}

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
        res.send(JSON.stringify(rides));
    });
});


app.use(express.static('./../public'));

app.listen(config.get('port'), function () {
    console.log('Server is running on port: ' + config.get('port'));
});

