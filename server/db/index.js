//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Bid = require('./models/Bid');
const Favor = require('./models/Favor');
const Comment = require('./models/Comment');
//associations could go here!

User.hasMany(Favor);
Favor.hasOne(User);
Favor.hasMany(Bid);
Bid.hasOne(Favor);
Bid.hasOne(User);
User.hasMany(Bid);
Bid.hasMany(Comment);
Comment.hasOne(Bid);
Comment.hasOne(User);
User.hasMany(Comment);
module.exports = {
  db,
  models: {
    User,
    Bid,
    Favor,
    Comment,
  },
};
