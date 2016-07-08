var config = require('config');


var express = require('express');
var Sniffer = require("./classes/Sniffer");
var models = require("./domain/models");

var app = express();

var sniffer = new Sniffer(config.get('mode'));

sniffer.run();

setInterval(() => {
    console.log('rerun');
    sniffer.run();
}, config.get('intervalSeconds') * 1000);

app.get('/results', function (req, res) {
    models.waitTime.all().then(function(times){
        res.send(JSON.stringify(times));
    });
});

app.use(express.static('./../public'));

app.listen(config.get('port'), function () {
    console.log('Example app listening on port 3000!');
});

