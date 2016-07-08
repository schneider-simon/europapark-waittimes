var config = {
    mode: 'test',
    intervalSeconds: 60 * 10
};

var express = require('express');
var Sniffer = require("./classes/Sniffer");
var app = express();

var sniffer = new Sniffer(config.mode);

sniffer.run();

setInterval(() => {
    console.log('rerun');
    sniffer.run();
}, config.intervalSeconds * 1000);

app.get('/results', function (req, res) {
    Waittime.all().then(function(times){
        res.send(JSON.stringify(times));
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
