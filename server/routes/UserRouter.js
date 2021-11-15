const express = require("express");
const route = express.Router();
const { authorizationAdmin } = require("../middlewares/authorization");
const UsersController = require("../controllers/UsersController");
const { authorizatioUpdateUsers } = require("../middlewares/authorization");

// In order to prevent ALL users having the access of info to ALL OTHER users, only Admins can access all user info
route.get("/", authorizationAdmin, UsersController.readAllUsers);
route.get("/detail", UsersController.readOneUsers);
route.put("/:id", authorizatioUpdateUsers, UsersController.updateUser);
route.delete("/:id", UsersController.deleteUser);

module.exports = route;
