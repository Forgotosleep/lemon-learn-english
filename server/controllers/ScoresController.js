const getScore = require("../helpers/pronunciation");
const uploadAudio = require("../helpers/uploadCloudinary");

const { Score } = require("../models");
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
      const { id } = req.user
      let soundUrl;

      if (req.file) {
        soundUrl = await uploadAudio(req.file);
      }

      const { score, taskId, answer } = req.body;
      const resp = await Score.create({
        score,
        studentId: id, //: 1, // harcode req.user.id (student)
        taskId, //: 1, // harcode
        soundUrl,
        answer, //: "ngasal", // harcode
      });
      res.status(201).json(resp);
    } catch (err) {
      next(err);
    }
  }

  static async getScore(req, res, next) {
    try {
      const file = req.file;
      const { question } = req.body
      const resp = await getScore(file, question);
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
