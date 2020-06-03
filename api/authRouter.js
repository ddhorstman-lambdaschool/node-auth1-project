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
    const { username, password } = req.body;
    const { password: passwordHash } = req.user;
    if (!bcrypt.compareSync(password, passwordHash)) {
      return res.status(401).json({ message: "Invalid password" });
    }
    req.session.username = username;
    res.status(200).json("Logged in");
  })
);

router.get(
  "/logout",
  catchAsync(async (req, res, next) => {
    if (req.session) {
      res.clearCookie("node-auth1-session");
      req.session.destroy(err =>
        err
          ? next(new AppError("An error occurred while trying to log out", 500))
          : res.status(200).json({ message: "Logged out" })
      );
    } else res.status(400).json({ message: "User is not logged in." });
  })
);

/*----------------------------------------------------------------------------*/
/* Middleware
/*----------------------------------------------------------------------------*/
function validateUserObject(req, res, next) {
  const { username, password } = req.body;
  username && password
    ? next()
    : res.status(400).json({
        message: "User object requires both 'username' and 'password' fields",
      });
}

function validateUsername(desire) {
  const userShouldExist = desire === "exists";

  return catchAsync(async (req, res, next) => {
    const { username } = req.body;
    const existingWithUsername = await db.getUser({ username });
    if (!userShouldExist && existingWithUsername) {
      return res
        .status(400)
        .json({ message: `A user with username ${username} already exists.` });
    }
    if (userShouldExist && !existingWithUsername) {
      return res
        .status(404)
        .json({ message: `No user with username ${username} exists` });
    }
    req.user = existingWithUsername;
    return next();
  });
}

/* Export --------------------------------------------------------------------*/
module.exports = router;
