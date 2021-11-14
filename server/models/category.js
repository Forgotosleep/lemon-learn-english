"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Class, { foreignKey: "categoryId" });
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name cannot be empty!" },
          notNull: { msg: "Name cannot be null!" },
          async isUnique(val) {
            const result = await Category.findOne({ where: { name: val } });
            if (result) throw new Error("Category name is duplicated");
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
