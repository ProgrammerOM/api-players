const express = require("express");
const route = express.Router();
const {
  PlayersDaily,
  PlayersApplyDaily,
  PlayersAll,
} = require("../controllers/randomcontroller");

route.get("/api/playersdaily", PlayersDaily);
route.get("/api/playersall", PlayersAll);
route.get("/api/playersapplydaily", PlayersApplyDaily);

module.exports = route;
