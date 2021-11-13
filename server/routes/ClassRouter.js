const express = require("express");
const route = express.Router();

const ClassController = require("../controllers/ClassController");
const { authorizationTeacher } = require("../middlewares/authorization");

route.get("/", ClassController.findAllClass);
route.get("/:id", ClassController.findOneClass);
// Teachers get to Create, Update and Delete classes
route.post("/", authorizationTeacher, ClassController.addClass);
route.put("/:id", authorizationTeacher, ClassController.updateClass);
route.delete("/:id", authorizationTeacher, ClassController.deleteClass);

module.exports = route;
