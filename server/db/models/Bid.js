const Sequelize = require('sequelize');
const db = require('../db');

const Bid = db.define('bid', {
  timestamp: {
    type: Sequelize.DATE(6), //=> this gets the date and time
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Bid;
