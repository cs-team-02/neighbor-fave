const router = require('express').Router();
const {
  models: { Favor, User, Bid, Comment },
} = require('../db');
module.exports = router;

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'name', 'ImageURL', 'address'],
      include: [{ model: Favor }, { model: Bid, include: { model: Favor } }],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:userId    --- get one user, and attach their favors and bids
router.get('/:userId', async (req, res, next) => {
  const user = await User.findByPk(req.params.userId, {
    include: [
      { model: Favor, include: { model: Bid } },
      {
        model: Bid,
        include: {
          model: Favor,
          include: [{ model: Bid }, { model: User, as: 'author' }],
        },
      },
    ],
  });
  res.send(user);

  // if eager loading can't include these models, then instead query DB for
  // all favors where authorId is this userId,
  // and all bids where volunteerId is this userId
  // get both of these as arrays and attach them to the retrieved user instance
  // and THEN res.send back the user instance object
});
