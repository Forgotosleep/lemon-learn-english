const { Class } = require("../models");

class ClassController {
  static async findAllClass(req, res, next) {
    try {
      const result = await Class.findAll();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async findOneClass(req, res, next) {
    try {

      const { id } = req.params
      const result = await Class.findByPk(id)

      if (!result) {
        // IF CLASS NOT FOUND
        throw { name: "ClassNotFound", id };
      }

      // IF CLASS IS FOUND
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async addClass(req, res, next) {
    try {
      const { name, teacherId, levelId, categoryId, ratings } = req.body;
      const { name, teacherId, levelId, categoryId } = req.body
      const result = await Class.create(
        {
          name, teacherId, levelId, categoryId
        },
      )

      // IF CLASS IS CREATED
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async updateClass(req, res, next) {
    try {
      const { id } = req.params;
      const { name, teacherId, levelId, categoryId, ratings } = req.body;
      const result = await Class.update(
        {
          name, teacherId, levelId, categoryId, ratings
        },
        {
          where: { id },
          returning: true,
        }
      );

      // IF CLASS NOT FOUND
      if (!result[0]) {
        throw { name: "ClassNotFound", id };
      }

      // IF CLASS IS UPDATED
      res.status(200).json(result[1]);
    } catch (err) {
      next(err);
    }
  }

  static async deleteClass(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Class.findOne(id);


      if (!result) {
        // IF CLASS NOT FOUND
        throw { name: "ClassNotFound", id };
      }

      // IF CLASS IS FOUND
      await Class.destroy({
        where: { id },
      });
      res
        .status(200)
        .json({ message: `Successfully deleted Class ${result.name}` });

    } catch (err) {
      next(err);
    }
  }
}

module.exports = ClassController;
