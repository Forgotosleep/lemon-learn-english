const express = require("express");
const route = express.Router();
const { authorizationAdmin } = require('../middlewares/authorization')

const UsersController = require("../controllers/UsersController");

route.get("/", authorizationAdmin, UsersController.readAllUsers);
route.get("/:id", UsersController.readOneUsers);
route.put("/:id", UsersController.updateUser);
route.delete("/:id", authorizationAdmin, UsersController.deleteUser);

module.exports = route;
