var request = require('request');
var moment = require('moment');
const crypto = require('crypto')
var Hasher = require('./Hasher');
var momentTimezone = require('moment-timezone');
var mockWaitTimes = require('./../data/waittimes.json');
var fs = require('fs');
var models = require("./../domain/models");
var database = require('./../services/database');
var config = require('config');

module.exports = class Sniffer {
    constructor(mode) {
        this.mode = (mode) ? mode : 'test';
        this.url = config.get("waitingTimesBaseUrl")
    }

    run() {

        if (this.mode === "test") {
            this.loaded(mockWaitTimes);
            return;
        }

        const secretKey = config.get('secretKey')
        const dateTimeString = moment().utc().format("YYYYMMDDHH")

        const hash = crypto.createHmac('sha256', secretKey)
            .update(dateTimeString)
            .digest('hex')
            .toUpperCase();

        let parameters = {token: hash}

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
            token: code,
            v: 4,
            base: time.format('X')
        };
    }

    loaded(result) {
        var results = (typeof result !== 'object') ? JSON.parse(result) : result;
        var jsonString = JSON.stringify(results, null, 4);
        fs.writeFile("./data/fetched/wait-times_" + moment().format('YYYY-MM-DD-HH-mm-ss') + '.json', jsonString);

        for (var i in results) {
            var result = results[i];
            this.saveResult(result);
        }
    }

    saveResult(result) {
        console.log(result)
        if (result.time === '-') {
            result.time = 0;
        }

        database.sync().then(() => {
            return models.waitTime.create({
                park_plan_code: result.code,
                minutes: parseInt(result.time, 10),
                type: parseInt(result.type, 10),
                status: parseInt(result.status, 10),
            });
        });
    }

    static encodeQueryData(data) {
        var ret = [];
        for (var d in data) {
            ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
        }
        return ret.join("&");
    }

    static createHeaders() {
        return {
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; D5803 Build/23.5.A.0.575; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/51.0.2704.81 Mobile Safari/537.36",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "*/*",
            "Accept-Encoding": "deflate",
            "Accept-Language": "de-DE,en-US;q=0.8"
        }
    }
};