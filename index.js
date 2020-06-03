const express = require("express");
const server = express();

server.use(express.json());



/*----------------------------------------------------------------------------*/
/* Listen
/*----------------------------------------------------------------------------*/
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
