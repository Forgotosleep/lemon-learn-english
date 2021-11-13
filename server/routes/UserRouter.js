const express = require("express");
const route = express.Router();

const UsersController = require("../controllers/UsersController");

const { authorizatioUpdateUsers } = require("../middlewares/authorization");

route.get("/", UsersController.readAllUsers);
route.get("/:id", UsersController.readOneUsers);
route.put("/:id", authorizatioUpdateUsers, UsersController.updateUser);
route.delete("/:id", UsersController.deleteUser);

module.exports = route;
