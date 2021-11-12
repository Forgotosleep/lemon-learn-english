const express = require("express");
const route = express.Router();

const UsersController = require("../controllers/UsersController");

route.get("/", UsersController.readAllUsers);
route.get("/:id", UsersController.readOneUsers);
route.put("/:id", UsersController.updateUser);
route.delete("/:id", UsersController.deleteUser);

module.exports = route;
