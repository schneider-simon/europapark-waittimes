var request = require('request');
var crypto = require('crypto');
var moment = require('moment');
var momentTimezone = require('moment-timezone');
var fs = require('fs');

var mockWaiTimes = require('./data/waittimes.json');

var mode = "real";

var time = moment.tz('Europe/Berlin');
var dateString = time.format('YYYYMMDDHHmm');
var code = crypto.createHash('md5').update('Europa-Park' + dateString + 'SecondTry').digest('hex');

console.log(dateString);

var parameters = {
    code: code,
    v: 4,
    base: time.format('X')
};

console.log(parameters);

if(mode === "test"){
    loaded(mockWaiTimes);
} else {
    request({url: 'https://apps.europapark.de/webservices/waittimes/index.php', qs:parameters}, function(err, response, body){
        if(err) { console.log(err); return; }

        loaded(response.body);
    });
}

function loaded(result){

    var json = (typeof result !== 'object')? JSON.parse(result) : result;
    var jsonString = JSON.stringify(json, null, 4);

    fs.writeFile("./data/fetched/wait-times_" + moment().format('YYYY-MM-DD-HH-mm-ss') + '.json', jsonString);

}