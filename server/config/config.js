// configurando o Sequelize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pit', 'root', '5459', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
