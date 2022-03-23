//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Bid = require('./models/Bid');
const Favor = require('./models/Favor');
const Comment = require('./models/Comment');
//associations could go here!

User.hasMany(Favor, { foreignKey: 'authorId' });
Favor.belongsTo(User, { as: 'author' });
Favor.hasMany(Bid);
Bid.belongsTo(Favor);
User.hasMany(Bid, { foreignKey: 'volunteerId' });
Bid.belongsTo(User, { as: 'volunteer' });
Bid.hasMany(Comment);
Comment.belongsTo(Bid);
User.hasMany(Comment, { foreignKey: 'creatorId' });
Comment.belongsTo(User, { as: 'creator' });
module.exports = {
  db,
  models: {
    User,
    Bid,
    Favor,
    Comment,
  },
};
