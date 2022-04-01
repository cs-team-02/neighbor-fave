// const { STRING } = require('sequelize');
const Sequelize = require("sequelize");
const db = require("../db");

const Favor = db.define("favor", {
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
    defaultValue: "",
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("OPEN","ASSIGNED","CLOSED"),
    defaultValue: "OPEN",
  },
  favorDate: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW
  },
  lat: {
    type: Sequelize.FLOAT
  },
  lng: {
    type: Sequelize.FLOAT
  }
});

module.exports = Favor;
