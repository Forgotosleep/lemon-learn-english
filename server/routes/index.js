const express = require("express");
const route = express.Router();

const UserRouter = require("./UserRouter");
const TaskRouter = require("./TaskRouter");
const ClassRouter = require("./ClassRouter");

route.use("/users", UserRouter);
route.use("/tasks", TaskRouter);
route.use("/classes", ClassRouter);

module.exports = route;
