const express = require("express");
const route = express.Router();
const { authorizationAdmin } = require("../middlewares/authorization");
const ScoresController = require("../controllers/ScoresController");
const { authorizatioUpdateUsers } = require("../middlewares/authorization");
const { uploadBuffer, upload } = require("../middlewares/uploadMulter");

// Authorization will be used here
route.get("/", ScoresController.displayAll);
route.get("/:id", ScoresController.displayOne);

// route.post("/", upload.single("soundUrl"), ScoresController.createScore);
// route.post(
//   "/get-score",
//   uploadBuffer.single("file"),

route.post("/", upload.single("soundUrl"), ScoresController.createScore);
route.post(
  "/get-score",
  uploadBuffer.single("file"),
  ScoresController.getScore
);
route.put("/:id", ScoresController.updateScore);
route.delete("/:id", ScoresController.deleteScore);

module.exports = route;
