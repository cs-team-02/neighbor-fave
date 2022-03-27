const router = require("express").Router();
const {
  models: { User, Bid },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    // res.send(await User.findByToken(req.headers.authorization))
    // adapted the original route so we attach that user's bids to the user
    // object before returning it. So that user object on AUTH state also
    // has access to all of the currently logged in user's bids
    let user = await User.findByToken(req.headers.authorization);
    let bids = await Bid.findAll({ where: { volunteerId: user.id } });
    user.dataValues.bids = bids;
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});
