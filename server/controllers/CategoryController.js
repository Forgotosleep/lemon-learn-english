const { Category } = require("../models/index");

class CategoryController {
  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;
      const resp = await Category.create({
        name,
      });
      res.status(201).json({ message: "Success add category" });
    } catch (err) {
      next(err);
    }
  }

  static async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      if (!Number(id)) throw { name: "InvalidCategoryId" };
      const resp = await Category.findByPk(id, {
        attributes: ["id", "name"],
      });
      if (!resp) throw { name: "CategoryNotFound", id };
      res.status(200).json(resp);
    } catch (err) {
      next(err);
    }
  }

  static async getAllCategory(req, res, next) {
    try {
      const resp = await Category.findAll({
        attributes: ["id", "name"],
      });
      res.status(200).json(resp);
    } catch (err) {
      next(err);
    }
  }

  static async updateCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      if (!Number(id)) throw { name: "InvalidCategoryId" };
      const { name } = req.body;
      const category = await Category.findByPk(id);
      if (!category) throw { name: "CategoryNotFound", id };
      const resp = await Category.update(
        {
          name,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({ message: `category with id ${category["id"]} has updated` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      if (!Number(id)) throw { name: "InvalidCategoryId" };
      const category = await Category.findByPk(id);
      if (!category) throw { name: "CategoryNotFound", id };
      await Category.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ message: `category with id ${category["id"]} has deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
