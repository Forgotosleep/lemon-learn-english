const express = require("express");
const TaskController = require("../controllers/TaskController");
const route = express.Router();
const { authorizationTeacher, authorizationTaskMaterial } = require('../middlewares/authorization')

route.get("/", TaskController.get);
route.get("/:id", TaskController.getById);
// Teachers gets to create, update and delete task for students.
route.post("/add", authorizationTeacher, TaskController.create);
// authorizationTaskMaterial makes sure that only Teachers that owns the class the task belongs to can update and delete said task.
route.put("/:id", authorizationTeacher, authorizationTaskMaterial, TaskController.update);
route.delete("/:id", authorizationTeacher, authorizationTaskMaterial, TaskController.delete);

module.exports = route;
