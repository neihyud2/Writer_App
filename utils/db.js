const { Sequelize } = require('sequelize');

var sequelize = new Sequelize('mydb', 'root', '2458696357', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize