const express = require("express");
const LevelController = require("../controllers/LevelController");
const route = express.Router();


route.get("/", LevelController.getAllLevel);
route.get("/:id", LevelController.getLevelByID);
route.post("/", LevelController.addLevel);
route.put("/:id", LevelController.updateLevelById);
route.delete("/:id", LevelController.deleteLevelById);

module.exports = route;
