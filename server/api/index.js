const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/favors", require("./favors"));
router.use("/bids", require("./bids"));
router.use("/comments", require("./comments"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
