const express = require("express");
const route = express.Router();
const {
  ApiPlayersOnline,
  ApiPlayersAll,
  ApiPlayersRegister,
} = require("../api/Players");

route.get("/api/playersonline", ApiPlayersOnline);
route.get("/api/playersall", ApiPlayersAll);
route.get("/api/playersregister", ApiPlayersRegister);

module.exports = route;
