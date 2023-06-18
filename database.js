// database.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './mydatabase.sqlite', // Nombre y ubicación del archivo de la base de datos SQLite
});

module.exports = sequelize;
