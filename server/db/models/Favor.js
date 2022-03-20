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
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  dateCreated: {
    type: Sequelize.DATEONLY,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Favor;
