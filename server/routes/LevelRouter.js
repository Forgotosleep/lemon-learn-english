const express = require("express");
const LevelController = require("../controllers/LevelController");
const route = express.Router();
const { authorizationAdmin } = require('../middlewares/authorization')

/* Only Admins are allowed to Create, Update and Delete Level entity */
route.get("/", LevelController.getAllLevel);
route.get("/:id", LevelController.getLevelByID);
route.post("/", authorizationAdmin, LevelController.addLevel);
route.put("/:id", authorizationAdmin, LevelController.updateLevelById);
route.delete("/:id", authorizationAdmin, LevelController.deleteLevelById);

module.exports = route;
