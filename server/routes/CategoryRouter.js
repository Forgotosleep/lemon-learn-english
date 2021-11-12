const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const route = express.Router();


route.get("/", CategoryController.getAllCategory);
route.get("/:id", CategoryController.getCategoryById);
route.post("/", CategoryController.addCategory);
route.put("/:id", CategoryController.updateCategoryById);
route.delete("/:id", CategoryController.deleteCategoryById);

module.exports = route;
