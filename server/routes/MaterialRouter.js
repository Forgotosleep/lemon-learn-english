const express = require("express");
const MaterialController = require("../controllers/MaterialsController");
const route = express.Router();
const { authorizationTeacher, authorizationTaskMaterial } = require('../middlewares/authorization')

route.get("/", MaterialController.getAllMaterial);
route.get("/:id", MaterialController.getMaterialById);
route.post("/", authorizationTeacher, MaterialController.addMaterial);
// authorizationTaskMaterial makes sure that only Teachers that owns the class the material belongs to can update and delete said material.
route.put("/:id", authorizationTeacher, authorizationTaskMaterial, MaterialController.updateMaterial);
route.delete("/:id", authorizationTeacher, authorizationTaskMaterial, MaterialController.deleteMaterialByID);

module.exports = route;
