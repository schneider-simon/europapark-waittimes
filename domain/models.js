var Sequelize = require('sequelize');
var database = require('./../services/database');

module.exports = {
    waitTime: database.define('wait_time', {
        park_plan_code: Sequelize.INTEGER,
        minutes: Sequelize.INTEGER
    })
};