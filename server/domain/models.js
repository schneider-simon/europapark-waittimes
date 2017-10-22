var Sequelize = require('sequelize');
var database = require('./../services/database');

module.exports = {
    waitTime: database.define('wait_time', {
        park_plan_code: Sequelize.INTEGER,
        minutes: Sequelize.INTEGER,
        type: Sequelize.INTEGER,
        status: Sequelize.INTEGER
    }),
    weather: database.define('weather', {
        date: Sequelize.DATE,
        data: Sequelize.JSON,
        temperature: Sequelize.FLOAT,
        precipitation: Sequelize.FLOAT,
        description: Sequelize.STRING,
        temperature_3h: Sequelize.FLOAT,
        precipitation_3h: Sequelize.FLOAT,
        description_3h: Sequelize.STRING,
        temperature_6h: Sequelize.FLOAT,
        precipitation_6h: Sequelize.FLOAT,
        description_6h: Sequelize.STRING,
        temperature_9h: Sequelize.FLOAT,
        precipitation_9h: Sequelize.FLOAT,
        description_9h: Sequelize.STRING,
        temperature_24h: Sequelize.FLOAT,
        precipitation_24h: Sequelize.FLOAT,
        description_24h: Sequelize.STRING,
    })
};