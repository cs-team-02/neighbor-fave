const router = require("express").Router();
const {
  models: { Bid },
} = require("../db");
module.exports = router;

// GET /api/bids
router.get("/", async (req, res, next) => {
  const allBids = await Bid.findAll({
    include: Comment,
    include: { model: User, as: "creator" },
  });
  // gets all bids, and bids' comments, and comments' creators
  res.send(allBids);
});

router.get("/:bidId/comments", async (req, res, next) => {
  const bid = await Bid.findByPk(req.params.bidId);

  const comments = await Comment.findAll({
    where: { bid_id: req.params.bidId },
  });
  bid.comments = comments;
  res.send(bid);
});

router.post("/", async (req, res, next) => {
  try {
    const newBid = await Bid.create(req.body);
    res.send(newBid);
  } catch (error) {
    console.log("error creating bid in the DB", error);
  }
});

router.put("/:bidId", async (req, res, next) => {
  try {
    const bid = await Bid.findByPk(req.params.bidId);
    const updatedBid = await bid.update(req.body);
    res.send(updatedBid);
  } catch (error) {
    console.log("error updating bid in DB", error);
  }
});
