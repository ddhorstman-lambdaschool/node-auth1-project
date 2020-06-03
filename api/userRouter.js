const router = require("express").Router();
const db = require("../data/userModel");
const { catchAsync, AppError } = require("./errors");

router.use(restrictAccess);

router.get(
  "/",
  catchAsync(async (req, res) => {
    res.status(200).json(await db.getUsers());
  })
);

/*----------------------------------------------------------------------------*/
/* Restricted access middleware
/*----------------------------------------------------------------------------*/
function restrictAccess(req, res, next) {
  req.session && req.session.username
    ? next()
    : next(new AppError("You must be logged in to do that", 403));
}

module.exports = router;
