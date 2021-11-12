const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const route = express.Router();
const UsersController = require("../controllers/UsersController");
const UserRouter = require("./UserRouter");
const TaskRouter = require("./TaskRouter");
const ClassRouter = require("./ClassRouter");
const MaterialRouter = require("./MaterialRouter")
const LevelRouter = require('./LevelRouter');
const CategoryRouter = require('./CategoryRouter')
const errorHandler = require("../middlewares/errorHandler");
const authentication = require("../middlewares/authentication");

route.post("/register", UsersController.newUser);
route.post("/login", UsersController.login);
route.use(authentication);
route.use("/users", UserRouter);
route.use("/tasks", TaskRouter);
route.use("/classes", ClassRouter);
route.use("/materials", MaterialRouter)
route.use("/levels", LevelRouter)
route.use("/categories", CategoryRouter)

route.use(errorHandler)

module.exports = route;
