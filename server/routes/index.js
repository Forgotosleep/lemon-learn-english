const express = require("express");
const route = express.Router();

const UserRouter = require("./UserRouter");
const ClassRouter = require("./ClassRouter");

route.use("/users", UserRouter);
route.use("/classes", ClassRouter);

module.exports = route;
