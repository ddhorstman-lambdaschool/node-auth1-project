const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);

const sessionDuration = 1000 * 60 * 60 * 24;

const sessionConfig = {
  name: "node-auth1-session",
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: sessionDuration,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "none",
  },
  resave: false,
  saveUninitialized: process.env.NODE_ENV !== "production",

  store: new knexSessionStore({
    knex: require("../data/dbConfig"),
    tableName: "session",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: sessionDuration,
  }),
};

server.use(helmet());
server.use(cors({ origin: "http://localhost:3000", credentials: true }));
server.use(express.json());
server.use(session(sessionConfig));

const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const { custom404, errorHandling } = require("./errors");

server.use("/api/users", userRouter);
server.use("/api", authRouter);

server.all("*", custom404);
server.use(errorHandling);

module.exports = server;
