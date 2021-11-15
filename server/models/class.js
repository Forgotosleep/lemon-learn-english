"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.belongsTo(models.Category, { foreignKey: "categoryId" });
      Class.belongsTo(models.Level, { foreignKey: "levelId" });
      Class.belongsTo(models.User, { foreignKey: "teacherId", as: "teacher" });
      Class.belongsToMany(models.User, {
        through: models.StudentClass,
        foreignKey: "classId",
      });
      Class.hasMany(models.Task, { foreignKey: "classId" });
      Class.hasMany(models.Material, { foreignKey: "classId" });
      Class.hasMany(models.StudentClass, { foreignKey: "classId" });
    }
  }
  Class.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Class name can't be empty` },
          notNull: { msg: `Class name can't be empty` },
        },
      },
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: `teacherId can't be empty` },
          isNumeric: { msg: `levelId has to be a number` },
        },
      },
      levelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: `levelId can't be empty` },
          isNumeric: { msg: `levelId has to be a number` },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: `categoryId can't be empty` },
          isNumeric: { msg: `categoryId has to be a number` },
        },
      },
      ratings: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isNumeric: { msg: `categoryId has to be a number` },
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
