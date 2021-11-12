'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Class, { foreignKey: 'categoryId' })
    }
  };
  Category.init({
    name: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Name cannot be empty!"}
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};