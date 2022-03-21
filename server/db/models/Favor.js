// const { STRING } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../db');

const Favor = db.define('favor', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  ImageURL: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  favorDate: {
    type: Sequelize.DATEONLY,
  },
});

module.exports = Favor;
