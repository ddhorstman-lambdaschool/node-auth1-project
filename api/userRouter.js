const router = require("express").Router();
const db = require("../data/userModel");
const bcrypt = require("bcryptjs");
const { catchAsync } = require("./errors");

router.post(
  "/register",
  validateUser,
  catchAsync(async (req, res) => {})
);

/*----------------------------------------------------------------------------*/
/* Middleware
/*----------------------------------------------------------------------------*/
function validateUser(req, res, next) {
  const user = req.body;
  user.username && user.password
    ? next()
    : next(
        new AppError("User requires both 'username' and 'password' fields", 404)
      );
}

module.exports = router;
