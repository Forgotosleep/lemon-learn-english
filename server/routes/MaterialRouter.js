const express = require("express");
const MaterialController = require("../controllers/MaterialsController");
const route = express.Router();
const { authorizationTeacher, authorizationMaterial } = require('../middlewares/authorization')

route.get("/", MaterialController.getAllMaterial);
route.get("/:id", MaterialController.getMaterialById);
route.post("/", authorizationTeacher, MaterialController.addMaterial);
// authorizationMaterial makes sure that only Teachers that owns the class the material belongs to can update and delete said material.
route.put("/:id", authorizationTeacher, authorizationMaterial, MaterialController.updateMaterial);
route.delete("/:id", authorizationTeacher, authorizationMaterial, MaterialController.deleteMaterialByID);

module.exports = route;
