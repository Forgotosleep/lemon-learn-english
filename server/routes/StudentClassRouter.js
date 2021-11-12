const express = require("express");
const StudentClassController = require("../controllers/StudentClassesController");
const route = express.Router();


route.get("/:classId", StudentClassController.getStudentEnrolledClass);
route.get("/", StudentClassController.getClassEnrolled);
route.patch("/:id", StudentClassController.updateStudentComplete);
route.patch("/hide/:id", StudentClassController.updateStudentHidden);
route.post("/:id", StudentClassController.addStudentClass);

module.exports = route;
