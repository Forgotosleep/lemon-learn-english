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
    } catch (err) {}
  }
  static async updateScore(req, res, next) {
    try {
    } catch (err) {}
  }
}

module.exports = ScoresController;
