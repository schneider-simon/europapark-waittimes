var config = require('config');

var Sequelize = require('sequelize');

var sequelize = new Sequelize(
    config.get('database.database'),
    config.get('database.username'),
    config.get('database.password')
);

module.exports = sequelize;