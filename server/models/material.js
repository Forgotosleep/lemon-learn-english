'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Material.belongsTo(models.Class, { foreignKey: 'classId' })
    }
  };
  Material.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Name can't be empty` },
        notNull: { msg: `Name can't be empty` },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Description can't be empty` },
        notNull: { msg: `Description can't be empty` },
      }
    },
    materialUrl: DataTypes.STRING,
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `classId can't be empty` },
        isNumeric: { msg: `classId has to be a number` }
      }
    }
  }, {
    sequelize,
    modelName: 'Material',
  });
  return Material;
};