"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.Class, { foreignKey: "classId" });
      Task.hasOne(models.Score, { foreignKey: "taskId" });
    }
  }
  Task.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Task name can't be empty` },
          notNull: { msg: `Task name can't be empty` },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Description can't be empty` },
          notNull: { msg: `Description can't be empty` },
        },
      },
      classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: `classId can't be empty` },
          isNumeric: { msg: `levelId has to be a number` }
        },
      },
      question: { type: DataTypes.STRING },
      soundUrl: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
