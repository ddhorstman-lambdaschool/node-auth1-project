const router = require("express").Router();
const db = require("../data/userModel");
const bcrypt = require("bcryptjs");
const { catchAsync, AppError } = require("./errors");

router.post(
  "/register",
  catchAsync(validateUser),
  catchAsync(async (req, res) => {
    const { user } = req;
    user.password = bcrypt.hashSync(user.password, 10);
    const saved = await db.addUser(user);
    res.status(201).json(saved);
  })
);

/*----------------------------------------------------------------------------*/
/* Middleware
/*----------------------------------------------------------------------------*/
async function validateUser(req, res, next) {
  const user = req.body;
  req.user = user;
  const list = await db.getUsers();
  const existingWithUsername = list.find(u => u.username == user.username);
  if (existingWithUsername)
    return next(
      new AppError(`A user with username ${user.username} already exists.`, 403)
    );
  user.username && user.password
    ? next()
    : next(
        new AppError(
          "Registration object requires both 'username' and 'password' fields",
          403
        )
      );
}

/* Export --------------------------------------------------------------------*/
module.exports = router;
