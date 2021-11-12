const express = require("express");
const route = express.Router();

const UserRouter = require("./UserRouter");

route.use("/users", UserRouter);

module.exports = route;
