const router = require('express').Router();
const {
  models: { Favor, User, Bid, Comment },
} = require('../db');
module.exports = router;

// GET /api/favors
//  get all favors
router.get('/', async (req, res, next) => {
  try {
    const favors = await Favor.findAll({
      where: {
        status: 'OPEN',
      },
      include: [
        {
          model: User,
          as: 'author',
          include: { model: Bid },
        },
        { model: Bid, include: { model: User, as: 'volunteer' } },
      ],
    });
    res.json(favors);
  } catch (err) {
    next(err);
  }
});

// GET /api/favors/:favorId
router.get('/:favorId', async (req, res, next) => {
  try {
    const favor = await Favor.findByPk(req.params.favorId, {
      include: [
        { model: User, as: 'author' },
        {
          model: Bid,
          include: [{ model: Comment }, { model: User, as: 'volunteer' }],
        },
      ],
    });
    res.send(favor);
  } catch (error) {
    console.log(error);
  }
});
// OR, if not all of these nested "includes" work, then:
// get one favor, eager load its author.
// And query DB for all bids with this favorId and attach the array to this favor as "bids" property

// GET /api/favors/:favorId/bids    --- get all the bids for a favor
router.get('/:favorId/bids');

router.get('/:favorId/bids/:bidId/comments');

// POST /api/favors    --- add a favor
router.post('/', async (req, res, next) => {
  try {
    const favor = await Favor.create(req.body);
    res.json(favor);
  } catch (error) {
    next(error);
  }
});

// PUT /api/favors/:favorId    --- edit a favor
router.put('/:favorId', async (req, res, next) => {
  try {
    const favor = await Favor.findByPk(req.params.favorId);
    const updatedFavor = await favor.update(req.body);
    res.send(updatedFavor);
    // const favor = await Favor.update({where: {id: req.params.favorId}}, req.body)
  } catch (error) {
    console.log('error updating favor in the DB', error);
  }
});

// DELETE /api/favors/:favorId    --- delete a favor
router.delete('/:favorId');
