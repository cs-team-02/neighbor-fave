const router = require("express").Router();
const {
  models: { Favor },
} = require("../db");
module.exports = router;

// GET /api/favors
router.get("/");
//  get all favors

// GET /api/favors/:favorId
router.get("/:favorId", async (req, res, next) => {
  const favor = await Favor.findByPk(req.params.favorId, {
    include: [
      { model: User, as: "Author" },
      { model: Bid, include: { model: Comment } },
    ],
  });
});
// OR, if not all of these nested "includes" work, then:
// get one favor, eager load its author.
// And query DB for all bids with this favorId and attach the array to this favor as "bids" property

// GET /api/favors/:favorId/bids    --- get all the bids for a favor
router.get("/:favorId/bids");

router.get("/:favorId/bids/:bidId/comments");

// POST /api/favors    --- add a favor
router.post("/");

// PUT /api/favors/:favorId    --- edit a favor
router.put("/:favorId");

// DELETE /api/favors/:favorId    --- delete a favor
router.delete("/:favorId");
