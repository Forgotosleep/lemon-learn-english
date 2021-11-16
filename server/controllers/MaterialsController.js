const { Material, Class } = require("../models/index");

class MaterialController {
  static async addMaterial(req, res, next) {
    try {
      const { name, description, materialUrl, classId } = req.body;
      const resp = await Material.create({
        name,
        description,
        materialUrl,
        classId,
      });
      res.status(201).json({ message: "Succeessfully added a new material" });
    } catch (err) {
      next(err);
    }
  }

  static async getMaterialById(req, res, next) {
    try {
      const { id } = req.params;
      if (!Number(id)) throw { name: "InvalidMaterialId" };
      const resp = await Material.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Class,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });
      if (!resp) throw { name: "MaterialNotFound", id };
      res.status(200).json(resp);
    } catch (err) {
      next(err);
    }
  }

  static async getAllMaterial(req, res, next) {
    try {
      const { classId } = req.query;
      let opt = {
        where: {},
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Class,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      };

      if (classId) opt.where.classId = classId;

      const resp = await Material.findAll(opt);
      res.status(200).json(resp);
    } catch (err) {
      next(err);
    }
  }

  static async deleteMaterialByID(req, res, next) {
    try {
      const { id } = req.params;
      const resp = await Material.findByPk(id);
      await Material.destroy({
        where: {
          id,
        },
      });
      res.status(200).json(resp);
    } catch (err) {
      next(err);
    }
  }

  static async updateMaterial(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, materialUrl, classID } = req.body;
      await Material.update(
        {
          name,
          description,
          materialUrl,
          classID,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({ message: "Succeessfully updated a material" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MaterialController;
