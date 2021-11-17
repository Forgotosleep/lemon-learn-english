const errorHandler = (err, req, res, next) => {
  /* CONTOH FORMAT ERROR */
  // throw { name: "CatNotFound", message: "Cat with ID <id> not found"}
  /// nama PascalCase, kata pertama adalah Entitas, kata-kata berikutnya kata kunci error. Properti 'message' opsional, bisa ditaruh pada Controller, atau di errorHandler.

  let message = []; // PAKAI KALAU ERROR MESSAGE LEBIH DARI SATU

  switch (err.name) {
    /* SEQUELIZE ERRORS */
    case "SequelizeValidationError":
      err.errors.map((error) => {
        message.push(error.message);
      });
      res.status(400).json({
        message:
          message ||
          err.errors[0].validatorArgs[0]?.message ||
          err.errors[0].message ||
          err,
      });
      // res.status(400).json({ message })
      // res.status(400).json(err)
      break;
    case "SequelizeUniqueConstraintError":
      err.errors.map((error) => {
        message.push(error.message);
      });
      res.status(400).json({ message });
      break;
    case "SequelizeForeignKeyConstraintError":
      err.errors.map((error) => {
        message.push(error.message);
      });
      res.status(400).json({ message });
      break;
    case "SequelizeDatabaseError":
      console.log(err, "<<< SEQ DATABASE ERR");
      err.errors?.map((error) => {
        message.push(error.message);
      });
      res.status(400).json({
        message: message.length ? message : `Invalid input data type`,
      });
      break;
    case "InvalidDataType":
      console.log(err, "<<< INVALID DATA TYPE");
      res.status(400).json({ message: `Invalid input data type` });
      break;

    /* USER ERRORS */
    // Bisa dipisah antara Student, Teacher dan Admin errors
    case "UserNotFound":
      res
        .status(404)
        .json({ message: err.message || `User with ID ${err?.id} not found` });
      break;

    /* CLASS ERRORS */
    case "ClassNotFound":
      res
        .status(404)
        .json({ message: err.message || `Class with ID ${err?.id} not found` });
      break;

    /* STUDENTCLASS ERRORS */
    case "StudentClassNotFound":
      res.status(404).json({
        message:
          err.message || `Student Class Data with ID ${err?.id} not found`,
      });
      break;
    /* TASK ERRORS */
    case "TaskNotFound":
      res
        .status(404)
        .json({ message: err.message || `Task with ID ${err?.id} not found` });
      break;

    /* SCORE ERRORS */
    case "ScoreNotFound":
      res
        .status(404)
        .json({ message: err.message || `Score with ID ${err?.id} not found` });
      break;
    case "SequelizeForeignKeyConstraintError":
      res.status(404).json({ message: err.message || `Foreign Key Error` });
    case "TypeError":
      res.status(404).json({ message: err.message || `Foreign Key Error` });
    /* LEVEL ERRORS */
    case "LevelNotFound":
      res
        .status(404)
        .json({ message: err.message || `Level with ID ${err?.id} not found` });
      break;
    /* INVALID ENTITY ID */
    case "InvalidLevelId":
    case "InvalidCategoryId":
    case "InvalidMaterialId":
    case "InvalidClassId":
    case "InvalidStudentClassId":
    case "InvalidUserId":
      res.status(400).json({ message: `Please check your ID` });
      break;

    /* CATEGORIES ERRORS */
    case "CategoryNotFound":
      res.status(404).json({
        message: err.message || `Category with ID ${err?.id} not found`,
      });
      break;

    /* MATERIAL ERRORS */
    case "MaterialNotFound":
      res.status(404).json({
        message: err.message || `Material with ID ${err?.id} not found`,
      });
      break;

    /* AUTHS ERRORS */
    case "LoginError":
      res.status(401).json({ message: "Invalid email/password" });
      break;
    case "MissingToken":
      res.status(401).json({
        message: err.message || "Please provide a valid access token",
      });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: err.message });
      break;
    case "Unauthorized":
      res.status(403).json({ message: err.message || "Unauthorized access" });
      break;

    case "duplicate class":
      res.status(400).json({ message: err.name });
      break;
    case "maxStudentClass":
      res.status(400).json({ message: "Class Over Student" });
      break;
    case "notCompletedClass":
      res
        .status(400)
        .json({ message: "your status is not completed for this class" });
      break;
    case "register":
      res
        .status(400)
        .json({ message: "User is already enrolled in the class" });
      break;
    /* WE HAVENT HANDLED THAT ONE YET ERROR */
    default:
      // res.status(500).json(err)  // For troubleshooting
      console.log(err, "<<< 500 ERRORHANDLER"); // For testing purpoises
      // console.log(err.name, "<<<>>>> Name of error"); //Display error name
      res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = errorHandler;
