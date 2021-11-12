const { Level } = require("../models");

class LevelController {
  static async create(req, res, next) {
    try {
      const { name } = req.body;

      await Level.create({ name });

      res.status(201).json({ message: "Level Created" });
    } catch (err) {
      next(err);
    }
  }

  static async get(req, res, next) {
    try {
      const levels = await Level.findAll();

      res.status(200).json(levels);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    const id = req.params.id;
    try {
      const level = await Level.findByPk(id);

      res.status(200).json(level);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    const id = req.params.id;
    try {
      await Level.destroy({ where: { id } });

      res.status(200).json({ message: "Level Deleted" });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    const id = req.params.id;
    try {
      const { name } = req.body;

      await Level.update({ name }, { where: { id } });

      res.status(201).json({ message: "Level Created" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LevelController;
