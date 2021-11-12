const express = require("express");
const route = express.Router();

const ClassController = require("../controllers/ClassController");

route.get("/", ClassController.findAllClass);
route.get("/:id", ClassController.findOneClass);
route.post("/", ClassController.addClass);
route.put("/:id", ClassController.updateClass);
route.delete("/:id", ClassController.deleteClass);

module.exports = route;
