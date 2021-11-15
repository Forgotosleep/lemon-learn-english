const { Task } = require("../models");

class TaskController {
  static async create(req, res, next) {
    try {
      const { name, description, question, soundUrl, classId } = req.body;
      const input = { name, description, question, soundUrl, classId };

      const result = await Task.create(input);

      res.status(201).json({ result });
      // res.status(201).json({ message: "Task Created" });
    } catch (err) {
      next(err);
      // res.status(500).json({ message: "error" });
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

      if (!task) {
        throw { name: "TaskNotFound", id };
      }

      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    const id = req.params.id;
    try {
      const task = await Task.findByPk(id);

      await Task.destroy({ where: { id } });

      res.status(200).json({ message: `Deleted task with ID ${id}` });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    const id = req.params.id;
    try {
      const { name, description, question, soundUrl, classId } = req.body;
      const input = { name, description, question, soundUrl, classId };

      const result = await Task.update(input, {
        where: { id },
        returning: true,
      });

      // IF CLASS NOT FOUND
      if (!result[0]) {
        throw { name: "TaskNotFound", id };
      }

      res
        .status(200)
        .json({ result: result[1][0], message: `Task with ID ${id} Updated` });
      // res.status(200).json({ message: "Task Updated" });
    } catch (err) {
      next(err);
    }
  }


}

module.exports = TaskController;
