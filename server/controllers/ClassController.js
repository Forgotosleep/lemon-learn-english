const { Class } = require('../models')

class ClassController {
  static async findAllClass(req, res, next) {
    try {
      const result = await Class.findAll()
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async findOneClass(req, res, next) {
    try {
      const { id } = req.params
      const result = await Class.findOne(id)

      if (!result) {  // IF CLASS NOT FOUND
        throw ({ name: 'ClassNotFound', id })
      }

      // IF CLASS IS FOUND
      res.status(200).json(result)

    } catch (err) {
      next(err)
    }
  }

  static async addClass(req, res, next) {
    // try {
    //   const { name, teacherId, levelId, categoryId, ratings } = req.body


    // } catch (err) {
    //   next(err)
    // }
  }

  static async updateClass(req, res, next) {

  }

  static async deleteClass(req, res, next) {

  }

}

module.exports = ClassController