const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const route = express.Router();

const UserRouter = require("./UserRouter");
const ClassRouter = require("./ClassRouter");
const MaterialRouter = require("./MaterialRouter")
const LevelRouter = require('./LevelRouter');
const CategoryRouter = require('./CategoryRouter')

route.use("/users", UserRouter);
route.use("/classes", ClassRouter);
route.use("/materials", MaterialRouter)
route.use("/levels", LevelRouter)
route.use("/categories", CategoryRouter)

route.use(errorHandler)

module.exports = route;
