const express = require("express");
const server = express();
const userRouter = require("./userRouter");
const { custom404, errorHandling } = require("./errors");

server.use(express.json());
server.use("/api", userRouter);

/*----------------------------------------------------------------------------*/
/* Error handling
/*----------------------------------------------------------------------------*/
server.all("*", custom404);
server.use(errorHandling);

module.exports = server;
