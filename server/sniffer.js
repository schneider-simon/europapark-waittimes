var process = require('process');
process.env.TZ = 'Europe/Berlin';

var config = require('config');

var Sniffer = require("./classes/Sniffer");
var moment = require('moment');

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


