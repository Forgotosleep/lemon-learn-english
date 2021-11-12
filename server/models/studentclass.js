'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentClass.belongsTo(models.User, { foreignKey: 'studentId' })
      StudentClass.belongsTo(models.Class, { foreignKey: 'classId' })
    }
  };
  StudentClass.init({
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `studentId can't be empty` },
        isNumeric: { msg: `levelId has to be a number` }
      }
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `classId can't be empty` },
        isNumeric: { msg: `levelId has to be a number` }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Class status can't be empty` },
      }
    },
  }, {
    sequelize,
    modelName: 'StudentClass',
  });
  return StudentClass;
};