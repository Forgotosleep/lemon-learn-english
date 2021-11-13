const express = require("express");
const route = express.Router();
const { authorizationAdmin } = require("../middlewares/authorization");
const ScoresController = require("../controllers/ScoresController");
const { authorizatioUpdateUsers } = require("../middlewares/authorization");

// Authorization will be used here
route.get("/", ScoresController.displayAll);
route.get("/:id", ScoresController.displayOne);
route.post("/", authorizatioUpdateUsers, ScoresController.updateScore);
// route.put("/scores/:id", ScoresController.deleteUser);
// route.delete("/scores/:id", ScoresController.delete);

module.exports = route;
