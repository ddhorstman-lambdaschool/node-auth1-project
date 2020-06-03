const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const { custom404, errorHandling } = require("./errors");

const sessionConfig = {
  name: "node-auth1-session",
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api", authRouter);
server.use("/api/users", userRouter);

/*----------------------------------------------------------------------------*/
/* Error handling
/*----------------------------------------------------------------------------*/
server.all("*", custom404);
server.use(errorHandling);

module.exports = server;
