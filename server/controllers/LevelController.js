const { Level } = require('../models/index')

class LevelController {
  static async addLevel(req, res, next) {
    try {
      const { name } = req.body
      const resp = await Level.create({ name })
      res.status(201).json({ message: 'Success add level' })
    } catch (err) {
      next(err)
    }
  }

  static async getLevelByID(req, res, next) {
    try {
      const { id } = req.params
      if (!Number(id)) throw({name:'InvalidLevelId'})
      const resp = await Level.findByPk(id, {
        attributes: ['id', 'name']
      })
      if (!resp) throw ({ name: "LevelNotFound", id })
      res.status(200).json(resp)
    } catch (err) {
      next(err)
    }
  }

  static async getAllLevel(req, res, next) {
    try {
      const resp = await Level.findAll({
        attributes: ['id', 'name']
      })
      res.status(200).json(resp)
    } catch (err) {
      next(err)
    }
  }

  static async updateLevelById(req, res, next) {
    try {
      const { id } = req.params
      if (!Number(id)) throw({name:'InvalidLevelId'})
      const { name } = req.body
      const level = await Level.findByPk(id)
      if (!level) throw ({ name: "LevelNotFound", id })
      const resp = await Level.update({
        name
      }, {
        where: {
          id
        }
      })
      res.status(200).json({ message: "Success update level" })
    } catch (err) {
      next(err)
    }
  }

  static async deleteLevelById(req, res, next) {
    try {
      const { id } = req.params
      if (!Number(id)) throw({name:'InvalidLevelId'})
      const level = await Level.findByPk(id)
      if (!level) throw ({ name: "LevelNotFound", id })
      const resp = await Level.destroy({
        where: {
          id
        }
      })
      res.status(200).json({ message: "Success delete level" })
    } catch (err) {
      next(err)
    }
  }




}

module.exports = LevelController