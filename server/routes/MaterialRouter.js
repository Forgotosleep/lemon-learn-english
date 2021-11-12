const express = require("express");
const MaterialController = require("../controllers/MaterialsController");
const route = express.Router();


route.get("/", MaterialController.getAllMaterial);
route.get("/:id", MaterialController.getMaterialById);
route.post("/", MaterialController.addMaterial);
route.put("/:id", MaterialController.updateMaterial);
route.delete("/:id", MaterialController.deleteMaterialByID);

module.exports = route;
