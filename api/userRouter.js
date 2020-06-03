const router = require("express").Router();
const db = require("../data/userModel");
const bcrypt = require("bcryptjs");
const { catchAsync, AppError } = require("./errors");

router.post(
  "/register",
  validateUsername("doesn't exist"),
  validateUserObject,
  catchAsync(async (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 10);
    const saved = await db.addUser(user);
    res.status(201).json({ ...saved, password: "••••••••••" });
  })
);

router.post(
  "/login",
  validateUsername("exists"),
  validateUserObject,
  catchAsync(async (req, res) => {
    const { password } = req.body;
    const { password: passwordHash } = req.user;
    if (!bcrypt.compareSync(password, passwordHash)) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json("Logged in");
  })
);

/*----------------------------------------------------------------------------*/
/* Middleware
/*----------------------------------------------------------------------------*/
function validateUserObject(req, res, next) {
  const { username, password } = req.body;
  username && password
    ? next()
    : next(
        new AppError(
          "User object requires both 'username' and 'password' fields",
          403
        )
      );
}

function validateUsername(desire) {
  const userShouldExist = desire === "exists";
  return catchAsync(async (req, res, next) => {
    const { username } = req.body;
    const existingWithUsername = await db.getUser({ username });
    if (!userShouldExist && existingWithUsername) {
      return next(
        new AppError(`A user with username ${username} already exists.`, 403)
      );
    } else if (userShouldExist && !existingWithUsername) {
      return next(
        new AppError(`No user with username ${username} exists`, 404)
      );
    } else {
      req.user = existingWithUsername;
      return next();
    }
  });
}

/* Export --------------------------------------------------------------------*/
module.exports = router;
