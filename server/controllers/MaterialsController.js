const { Material } = require('../models/index')

class MaterialController {
  static async addMaterial(req, res, next) {
    try {
      const { name, description, materialUrl, classID } = req.body
      const resp = await Material.create({
        name,
        description,
        materialUrl,
        classID
      })
      res.status(201).json({ message: 'Success create material' })
    } catch (err) {
      next(err)
    }
  }

  static async getMaterialById(req, res, next) {
    try {
      const { materialId } = req.params
      const resp = await Material.findByPk(materialId, {
        include: {
          model: Class,
          attributes: ['name']
        }
      })
      if (!resp) throw ({ name: 'MaterialNotFound', id: materialId })
      res.status(200).json(resp)
    } catch (err) {
      next(err)
    }
  }

  static async getAllMaterial(req, res, next) {
    try {
      const resp = await Material.findAll({
        include: {
          model: Class,
          attributes: ['name']
        }
      })
      res.status(200).json(resp)
    } catch (err) {
      next(err)
    }
  }

  static async deleteMaterialByID(req, res, next) {
    try {
      const { materialId } = req.params
      const resp = await Material.findByPk(materialId)
      if (!resp) throw ({ name: 'MaterialNotFound', id: materialId })
      await Material.destroy({
        where: {
          materialId
        }
      })
      res.status(200).json(resp)
    } catch (err) {
      next(err)
    }
  }


  static async updateMaterial(req, res, next) {
    try {
      const { name, description, materialUrl, classID } = req.body
      const material = await Material.findByPk(materialId)
      if (!material) throw ({ name: 'MaterialNotFound', id: materialId })
      const resp = await Material.update({
        name,
        description,
        materialUrl,
        classID
      })
      res.status(200).json({ message: 'Success update material' })
    } catch (err) {
      next(err)
    }
  }

}

module.exports = MaterialController