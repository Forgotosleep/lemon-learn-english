const express = require("express");
const TaskController = require("../controllers/TaskController");
const route = express.Router();
const { authorizationTeacher, authorizationTask } = require('../middlewares/authorization')

route.get("/", TaskController.get);
<<<<<<< HEAD

route.get("/class/:classId", TaskController.getTaskByClass);
// get All Task by classId
=======
route.get("/search-songs", authorizationTeacher, TaskController.searchSong)  // Accepts two queries of 'artist' and 'title'. Returns an array of object (songs) that matches said criteria. If no matches are found, some kind of popular songs is still returned from the API.
route.get("/search-songs/:songId", authorizationTeacher, TaskController.getSongDetails)
route.get("/question", authorizationTeacher, TaskController.getQuestion)
route.get("/get-listening-score", authorizationTeacher, TaskController.getListeningScore)
>>>>>>> 1c10ce1aa42fc1240f8c44515fe4e5bae293c2ec
route.get("/:id", TaskController.getById);
// Teachers gets to create, update and delete task for students.
route.post("/", authorizationTeacher, TaskController.create);
// authorizationTask makes sure that only Teachers that owns the class the task belongs to can update and delete said task.
route.put("/:id", authorizationTeacher, authorizationTask, TaskController.update);
route.delete("/:id", authorizationTeacher, authorizationTask, TaskController.delete);

module.exports = route;
