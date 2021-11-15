const express = require("express");
const route = express.Router();

const ClassController = require("../controllers/ClassController");
const { authorizationTeacher, authorizationStudent } = require("../middlewares/authorization");

route.get("/", ClassController.findAllClass);
route.get("/teacherClasses", ClassController.findClassByTeacherId);
route.get("/active", authorizationStudent, ClassController.findActiveClass);
route.get("/:id", ClassController.findOneClass);
// Teachers get to Create, Update and Delete classes
route.post("/", authorizationTeacher, ClassController.addClass);
route.put("/:id", ClassController.updateClass);
route.delete("/:id", ClassController.deleteClass);
route.patch("/status/:id", authorizationTeacher, ClassController.updateStatusClass);
route.patch("/:id", authorizationStudent, ClassController.rateClass);

module.exports = route;
