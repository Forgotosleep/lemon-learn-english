const { Task } = require("../models");

class TaskController {
  static async create(req, res, next) {
    try {
      const { name, description, question, soundUrl, classId } = req.body;
      const input = { name, description, question, soundUrl, classId };

      await Task.create(input);

      res.status(201).json({ message: "Task Created" });
    } catch (err) {
      res.status(500).json({ message: "error" });
      // next(err);
    }
  }

  static async get(req, res, next) {
    try {
      const tasks = await Task.findAll();

      res.status(200).json(tasks);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    const id = req.params.id;
    try {
      const task = await Task.findByPk(id);

      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    const id = req.params.id;
    try {
      await Task.destroy({ where: { id } });

      res.status(200).json({ message: "Task Deleted" });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    const id = req.params.id;
    try {
      const { name, description, question, soundUrl, classId } = req.body;
      const input = { name, description, question, soundUrl, classId };

      await Task.update(input, { where: { id } });

      res.status(200).json({ message: "Task Updated" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TaskController;
