var process = require('process');
process.env.TZ = 'Europe/Berlin';

var config = require('config');
var moment = require('moment');
const request = require("request");
const database = require('./services/database');
const models = require("./domain/models");

setInterval(() => {
    collectWeather()
}, config.get('weather.intervalSeconds') * 1000);

const collectWeather = () => {
    request({
        url: config.get("weather.foreCastUrl")
    }, (err, response, body) => {
        console.log('COLLECT WEATHER');

        if (err) {
            console.log(err);
            return;
        }

        const result = JSON.parse(response.body);
        const list = result.list;

        const weather = {
            date: new Date(list[0].dt * 1000),
            temperature: list[0].main.temp,
            precipitation: list[0].rain["3h"],
            description: list[0].weather[0].description,
            temperature_3h: list[1].main.temp,
            precipitation_3h: list[1].rain["3h"],
            description_3h: list[1].weather[0].description,
            temperature_6h: list[2].main.temp,
            precipitation_6h: list[2].rain["3h"],
            description_6h: list[2].weather[0].description,
            temperature_9h: list[3].main.temp,
            precipitation_9h: list[3].rain["3h"],
            description_9h: list[3].weather[0].description,
            temperature_24h: list[8].main.temp,
            precipitation_24h: list[8].rain["3h"],
            description_24h: list[8].weather[0].description
        }

        database.sync().then(() => {
            return models.weather.create(weather);
        });
    })
}

collectWeather()


