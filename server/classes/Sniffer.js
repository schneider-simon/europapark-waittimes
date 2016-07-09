var request = require('request');
var moment = require('moment');
var Hasher = require('./Hasher');
var momentTimezone = require('moment-timezone');
var mockWaitTimes = require('./../data/waittimes.json');
var fs = require('fs');
var models = require("./../domain/models");
var database = require('./../services/database');

module.exports = class Sniffer {
    constructor(mode) {
        this.mode = (mode) ? mode : 'test';
        this.url = 'https://apps.europapark.de/webservices/waittimes/index.php';
    }

    run() {

        if (this.mode === "test") {
            this.loaded(mockWaitTimes);
            return;
        }

        let parameters = Sniffer.createParameters();

        console.log('Calling: ' + this.url + '?' + Sniffer.encodeQueryData(parameters));

        request({
            url: this.url,
            qs: parameters,
            headers: Sniffer.createHeaders(),
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

    static encodeQueryData(data) {
        var ret = [];
        for (var d in data)
            ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
        return ret.join("&");
    }

    static createHeaders() {
        return {
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; D5803 Build/23.5.A.0.575; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/51.0.2704.81 Mobile Safari/537.36",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "de-DE,en-US;q=0.8"
        }
    }
};