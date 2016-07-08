var request = require('request');
var moment = require('moment');
var Hasher = require('./Hasher');
var momentTimezone = require('moment-timezone');
var mockWaitTimes = require('././waittimes.json');
var fs = require('fs');
var models = require("././models");
var database = require('././database');

module.exports = class Sniffer {
    constructor(mode) {
        this.mode = (mode) ? mode : 'test';
    }

    run() {
        if (this.mode === "test") {
            this.loaded(mockWaitTimes);
            return;
        }

        let parameters = Sniffer.createParameters();

        request({
            url: 'https://apps.europapark.de/webservices/waittimes/index.php',
            qs: parameters
        }, (err, response, body) => {
            if (err) {
                console.log(err);
                return;
            }

            this.loaded(response.body);
        });
    }

    static createParameters() {
        var time = moment.tz('Europe/Berlin');
        var code = Hasher.buildCode();

        return {
            code: code,
            v: 4,
            base: time.format('X')
        };
    }

    loaded(result) {
        var json = (typeof result !== 'object') ? JSON.parse(result) : result;
        var jsonString = JSON.stringify(json, null, 4);
        fs.writeFile("./data/fetched/wait-times_" + moment().format('YYYY-MM-DD-HH-mm-ss') + '.json', jsonString);

        for (var i in json.results) {
            var result = json.results[i];
            this.saveResult(result);
        }
    }

    saveResult(result) {
        database.sync().then(() => {
            return models.waitTime.create({
                park_plan_code: result.code,
                minutes: result.time
            });
        });
    }
};