const getScore = require("../helpers/pronunciation");
const uploadAudio = require("../helpers/uploadCloudinary");

const { Score, Task } = require("../models");
class ScoresController {
  static async displayAll(req, res, next) {
    try {
      const resp = await Score.findAll();
      res.status(200).json(resp);
    } catch (err) {
      next(err);
    }
  }
  static async displayOne(req, res, next) {
    try {
      const { id } = req.params;
      const resp = await Score.findOne({ where: { id } });
      if (!resp) throw { name: "ScoreNotFound", id };
      res.status(200).json(resp);
    } catch (err) {
      next(err);
    }
  }
  static async createScore(req, res, next) {
    try {
      const soundUrl = await uploadAudio(req.file);
      const { score, studentId, taskId, answer } = req.body;
      console.log("soundUrl:", soundUrl);
      const resp = await Score.create({
        score,
        studentId,
        taskId,
        soundUrl,
        answer,
      });
      console.log("resp nice", resp);
      console.log("soundUrl", soundUrl);
      res.status(201).json(resp);
    } catch (err) {
      next(err);
    }
  }

  static async getScore(req, res, next) {
    try {
      const { taskId } = req.body;
      const file = req.file;
      const task = await Task.findByPk(taskId);
      if (!task) throw { name: "TaskNotFound", taskId };
      const resp = await getScore(file, task.question); //task.question
      res.status(200).json(resp);
    } catch (err) {
      next(err);
    }
  }

  static async updateScore(req, res, next) {
    try {
      const { id } = req.params;
      const { score } = req.body;
      const newitem = await Score.findOne({ where: { id } });
      if (!newitem) throw { name: "ScoreNotFound", id };
      const resp = await Score.update({ score }, { where: { id } });
      res.status(200).json(newitem);
    } catch (err) {
      next(err);
    }
  }
  static async deleteScore(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Score.findOne({ where: { id } });
      const resp = await Score.destroy({
        where: { id },
      });
      res.status(200).json(deleted);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ScoresController;
