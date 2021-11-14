const express = require("express");
const StudentClassController = require("../controllers/StudentClassesController");
const route = express.Router();
const { authorizationStudent, authorizationTeacher } = require("../middlewares/authorization");

// Gets all student that is enrolled in a specific class.For Teachers.
route.get("/:classId", authorizationTeacher, StudentClassController.getStudentEnrolledClass);

// Gets all the class that a student is enrolled in. For Students.
route.get("/", authorizationStudent, StudentClassController.getClassEnrolled);

// This is meant to replace the 'delete' or 'un-enroll' or when a student quits from a class. Instead of deleting it, the server keeps the data but won't show it. If said student decides to enroll again, the progress will be returned to him as is.
route.patch("/hide/:id", authorizationStudent, StudentClassController.updateStudentHidden);
// This endpoint is meant to be hit automatically after a student completes all of the tasks in a class (maybe with a satisfactory score).
route.patch("/:id", authorizationStudent, StudentClassController.updateStudentIncomplete);

// This endpoint is meant to be used when a student enrolls in a class.
route.post("/:classId", authorizationStudent, StudentClassController.addStudentClass);

module.exports = route;
