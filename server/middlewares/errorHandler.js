const errorHandler = (err, req, res, next) => {
  /* CONTOH FORMAT ERROR */
  // throw { name: "CatNotFound", message: "Cat with ID <id> not found"} 
  /// nama PascalCase, kata pertama adalah Entitas, kata-kata berikutnya kata kunci error. Properti 'message' opsional, bisa ditaruh pada Controller, atau di errorHandler.

  let message = []  // PAKAI KALAU ERROR MESSAGE LEBIH DARI SATU

  switch (err.name) {
    /* SEQUELIZE ERRORS */
    case "SequelizeValidationError":
      err.errors.map(error => {
        message.push(error.message)
      })
      res.status(400).json({ message: err.errors[0].validatorArgs[0]?.message || err.errors[0].message || err })
      // res.status(400).json({ message })
      // res.status(400).json(err)
      break
    case "SequelizeUniqueConstraintError":
      err.errors.map(error => {
        message.push(error.message)
      })
      res.status(400).json({ message })
      break
    case "SequelizeForeignKeyConstraintError":
      err.errors.map(error => {
        message.push(error.message)
      })
      res.status(400).json({ message })
      break
    case "SequelizeDatabaseError":
      res.status(400).json({ message: err })
      break

    /* USER ERRORS */
    // Bisa dipisah antara Student, Teacher dan Admin errors


    /* CLASS ERRORS */
    case "ClassNotFound":
      res.status(404).json({ message: err.message || `Class with ID ${err?.id} not found` })
      break

    /* STUDENTCLASS ERRORS */

    /* TASK ERRORS */

    /* SCORE ERRORS */

    /* LEVEL ERRORS */

    /* CATEGORIES ERRORS */

    /* AUTHS ERRORS */
    case "LoginError":
      res.status(401).json({ message: 'Invalid email/password' })
      break
    case "MissingToken":
      res.status(401).json({ message: err.message || 'Please provide a valid access token' })
      break
    case "JsonWebTokenError":
      res.status(401).json({ message: err.message })
      break
    case "Unauthorized":
      res.status(403).json({ message: err.message || 'Unauthorized access' })
      break

    /* WE HAVENT HANDLED THAT ONE YET ERROR */
    default:
      // res.status(500).json(err)  // For troubleshooting
      console.log(err, "<<< 500 ERRORHANDLER");  // For testing purpoises
      res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = errorHandler