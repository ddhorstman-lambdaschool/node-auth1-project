const router = require("express").Router();
const db = require("../data/userModel");
const { catchAsync, AppError } = require("./errors");

module.exports = router;
