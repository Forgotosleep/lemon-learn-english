const express = require("express");
const route = express.Router();

const UserRouter = require("./UserRouter");
const ClassRouter = require("./ClassRouter");
const MaterialRouter = require("./MaterialRouter")

route.use("/users", UserRouter);
route.use("/classes", ClassRouter);
route.use("/materials", MaterialRouter)
module.exports = route;
