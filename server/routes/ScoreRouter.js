const express = require("express");
const route = express.Router();
const { authorizationAdmin } = require("../middlewares/authorization");
const ScoresController = require("../controllers/ScoresController");
const { authorizatioUpdateUsers } = require("../middlewares/authorization");

// Authorization will be used here
route.get("/", ScoresController.displayAll);
route.get("/:id", ScoresController.displayOne);
route.post("/", ScoresController.createScore);
route.put("/:id", ScoresController.updateScore);
route.delete("/:id", ScoresController.deleteScore);

module.exports = route;
