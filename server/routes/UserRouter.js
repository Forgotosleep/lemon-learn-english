const express = require("express");
const route = express.Router();
const { authorizationAdmin } = require('../middlewares/authorization')

const UsersController = require("../controllers/UsersController");

// In order to prevent ALL users having the access of info to ALL OTHER users, only Admins can access all user info
route.get("/", authorizationAdmin, UsersController.readAllUsers);
route.get("/:id", UsersController.readOneUsers);
route.put("/:id", UsersController.updateUser);
// The same goes for deleting users. It's an Admin-only privillege
route.delete("/:id", authorizationAdmin, UsersController.deleteUser);

module.exports = route;
