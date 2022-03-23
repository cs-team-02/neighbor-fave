const router = require("express").Router();
const {
  models: { Favor, User, Bid, Comment },
} = require("../db");
module.exports = router;

// GET /api/favors

router.get("/", async (req, res, next) => {
  try {
    const favors = await Favor.findAll({
      where: {
        status: "OPEN",
      },
      include: {
        model: User,
        include: { model: Bid },
      },
    });
    res.json(favors);
  } catch (err) {
    next(err);
  }
});

// GET /api/favors/:favorId
router.get("/:favorId", async (req, res, next) => {
  try {
    const favor = await Favor.findByPk(req.params.favorId, {
      include: [
        { model: User },
        { model: Bid, include: [{ model: Comment }, { model: User }] },
      ],
    });
    res.send(favor);
  } catch (error) {
    console.log(error);
  }
});

// GET /api/favors/:favorId/bids    --- get all the bids for a favor
router.get("/:favorId/bids");

router.get("/:favorId/bids/:bidId/comments");

// POST /api/favors    --- add a favor
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Favor.create(req.body));
  } catch (error) {
    next(error);
  }
});

// PUT /api/favors/:favorId    --- edit a favor
router.put("/:favorId", async (req, res, next) => {
  try {
    const favor = await Favor.findByPk(req.params.favorId);
    const updatedFavor = await favor.update(req.body);
    res.send(updatedFavor);
    // const favor = await Favor.update({where: {id: req.params.favorId}}, req.body)
  } catch (error) {
    console.log("error updating favor in the DB", error);
  }
});

// DELETE /api/favors/:favorId    --- delete a favor
router.delete("/:favorId");
