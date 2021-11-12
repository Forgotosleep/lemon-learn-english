const express = require("express");
const TaskController = require("../controllers/TaskController");
const route = express.Router();

route.get("/", TaskController.get);
route.get("/:id", TaskController.getById);
route.post("/add", TaskController.create);
route.put("/:id", TaskController.update);
route.delete("/:id", TaskController.delete);

module.exports = route;
