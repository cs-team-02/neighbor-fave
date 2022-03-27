//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Bid = require('./models/Bid');
const Favor = require('./models/Favor');
//associations could go here!

User.hasMany(Favor, { foreignKey: 'authorId' });
Favor.belongsTo(User, { as: 'author' });
Favor.hasMany(Bid);
Bid.belongsTo(Favor);
User.hasMany(Bid, { foreignKey: 'volunteerId' });
Bid.belongsTo(User, { as: 'volunteer' });
module.exports = {
  db,
  models: {
    User,
    Bid,
    Favor,
  },
};
