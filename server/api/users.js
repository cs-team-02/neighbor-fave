const router = require("express").Router();
const {
  models: { User, Favor, Bid },
} = require("../db");
module.exports = router;

// GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:userId    --- gets one user, and attach their favors and bids
router.get("/:userId", async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.userId);
    const bids = await Bid.findAll({
      where: { volunteerId: user.id },
    });

    const favors = await Favor.findAll({
      where: { authorId: user.id },
    });

    user.dataValues.favors = favors;
    user.dataValues.bids = bids;

    res.send(user);
  } catch (error) {
    console.log("error retrieving user from DB", error);
  }

  // const user = await User.findByPk(req.params.userId, {
  //   include: [{ model: Favor }, { model: Bid }],
  // });
  // if eager loading can't include models Favor and Bid (b/c of direction of relationship)
  // then instead query DB for
  // all favors where authorId is this userId,
  // and all bids where volunteerId is this userId
  // get both of these as arrays and attach them to the retrieved user instance
  // and THEN res.send back the user instance object
});
