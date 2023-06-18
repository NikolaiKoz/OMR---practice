// model.js
const Sequelize = require('sequelize');
const sequelize = require('./database');

const MyModel = sequelize.define('MyModel', {
  value: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = MyModel;
