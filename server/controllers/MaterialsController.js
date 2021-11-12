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
      res.status(201).json({ message: 'Success add material' })
    } catch (err) {
      next(err)
    }
  }

  static async getMaterialById(req, res, next) {
    try {
      const { id } = req.params
      if (!Number(id)) throw ({ name: "InvalidMaterialId" })
      const resp = await Material.findByPk(id, {
        include: {
          model: Class,
          attributes: ['name']
        }
      })
      if (!resp) throw ({ name: 'MaterialNotFound', id })
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
      const { id } = req.params
      if (!Number(id)) throw ({ name: "InvalidMaterialId" })
      const resp = await Material.findByPk(id)
      if (!resp) throw ({ name: 'MaterialNotFound', id })
      await Material.destroy({
        where: {
          id
        }
      })
      res.status(200).json(resp)
    } catch (err) {
      next(err)
    }
  }


  static async updateMaterial(req, res, next) {
    try {
      const { id } = req.params
      if (!Number(id)) throw ({ name: "InvalidMaterialId" })
      const { name, description, materialUrl, classID } = req.body
      const material = await Material.findByPk(id)
      if (!material) throw ({ name: 'MaterialNotFound', id})
      const resp = await Material.update({
        name,
        description,
        materialUrl,
        classID
      }, {
        where: {
          id
        }
      })
      res.status(200).json({ message: 'Success update material' })
    } catch (err) {
      next(err)
    }
  }


}


module.exports = MaterialController