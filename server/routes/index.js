const express = require("express");
const route = express.Router();

const UserRouter = require("./UserRouter");
const TaskRouter = require("./TaskRouter");

route.use("/users", UserRouter);
route.use("/tasks", TaskRouter);

module.exports = route;
