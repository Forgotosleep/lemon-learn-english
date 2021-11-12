const { Category } = require("../models");

class LevelController {
  static async create(req, res, next) {
    try {
      const { name } = req.body;

      await Category.create({ name });

      res.status(201).json({ message: "Category Created" });
    } catch (err) {
      next(err);
    }
  }

  static async get(req, res, next) {
    try {
      const categories = await Category.findAll();

      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    const id = req.params.id;
    try {
      const category = await Category.findByPk(id);

      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    const id = req.params.id;
    try {
      await Category.destroy({ where: { id } });

      res.status(200).json({ message: "Category Deleted" });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    const id = req.params.id;
    try {
      const { name } = req.body;

      await Category.update({ name }, { where: { id } });

      res.status(201).json({ message: "Category Created" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LevelController;
