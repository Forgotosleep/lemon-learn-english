const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const route = express.Router();
const { authorizationAdmin, authorizationStudent, authorizationTeacher, authorizationTask } = require('../middlewares/authorization')

/* Only Admins are allowed to Create, Update and Delete Category entity */
route.get("/", CategoryController.getAllCategory);
route.get("/:id", CategoryController.getCategoryById);
route.post("/", authorizationAdmin, CategoryController.addCategory);
route.put("/:id", authorizationAdmin, CategoryController.updateCategoryById);
route.delete("/:id", authorizationAdmin, CategoryController.deleteCategoryById);

module.exports = route;
