const Sequelize = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {
  timestamp: {
    type: Sequelize.DATE(6),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  content: {
    type: Sequelize.TEXT,
  },
});
module.exports = Comment;
