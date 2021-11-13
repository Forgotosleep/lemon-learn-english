const express = require("express");
const TaskController = require("../controllers/TaskController");
const route = express.Router();
const { authorizationAdmin, authorizationStudent, authorizationTeacher, authorizationTask } = require('../middlewares/authorization')

route.get("/", TaskController.get);
route.get("/:id", TaskController.getById);
// Teachers gets to create, update and delete task for students.
route.post("/add", authorizationTeacher, TaskController.create);
route.put("/:id", authorizationTeacher, authorizationTask, TaskController.update);
route.delete("/:id", authorizationTeacher, authorizationTask, TaskController.delete);

module.exports = route;
