"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Score.belongsTo(models.Task, { foreignKey: "taskId" });
      Score.belongsTo(models.User, { foreignKey: "studentId" });
    }
  };
  Score.init({
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: { msg: `Score can't be empty` },
        isNumeric: { msg: `Score has to be a number` }
      }
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `studentId can't be empty` },
        isNumeric: { msg: `studentId has to be a number` }
      }
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `taskId can't be empty` },
        isNumeric: { msg: `taskId has to be a number` }
      }
    },
    answer: { type: DataTypes.STRING, },
    soundUrl: { type: DataTypes.STRING, },
  }, {
    sequelize,
    modelName: 'Score',
  });
  return Score;
};
