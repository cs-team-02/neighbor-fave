//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Bid = require("./models/Bid");
const Favor = require("./models/Favor");
const Comment = require("./models/Comment");
//associations could go here!

User.hasMany(Favor);
Favor.belongsTo(User, { foreignKey: "authorId" });
Favor.hasMany(Bid);
Bid.belongsTo(Favor);
User.hasMany(Bid);
Bid.belongsTo(User, { foreignKey: "volunteerId" });
Bid.hasMany(Comment);
Comment.belongsTo(Bid, { foreignKey: "creatorId" });
User.hasMany(Comment);
Comment.belongsTo(User);
module.exports = {
  db,
  models: {
    User,
    Bid,
    Favor,
    Comment,
  },
};
