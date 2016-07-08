var request = require('request');
var crypto = require('crypto');
var moment = require('moment');
var fs = require('fs');
var momentTimezone = require('moment-timezone');

var mockWaiTimes = require('./data/waittimes.json');

var mode = "live";

var time = moment.unix(1467973025).tz('Europe/Berlin');
var dateString = time.format('YYYYMMDDHHmm');
var code = crypto.createHash('md5').update('Europa-Park' + dateString + 'Webservice').digest('hex');

console.log(dateString);

var parameters = {
    code: code,
    v: 2,
    dc: time.format('x')
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
    var json = JSON.stringify(JSON.parse(result), null, 4);

    fs.writeFile("./data/fetched/wait-times_" + moment().format('YYYY-MM-DD-HH-mm-ss') + '.json', json);

}