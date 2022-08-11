const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../utils/db')

const Posts = sequelize.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Name Doc'
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    }
})

module.exports = Posts