const express = require("express");
const route = express.Router();
const UsersController = require("../controllers/UsersController");
const UserRouter = require("./UserRouter");
const ClassRouter = require("./ClassRouter");
const MaterialRouter = require("./MaterialRouter")
const errorHandler = require("../middlewares/errorHandler");
const authentication = require("../middlewares/authentication");

route.post("/register", UsersController.newUser);
route.post("/login", UsersController.login);
route.use(authentication);
route.use("/users", UserRouter);
route.use("/classes", ClassRouter);
route.use("/materials", MaterialRouter)

route.use(errorHandler);

module.exports = route;
