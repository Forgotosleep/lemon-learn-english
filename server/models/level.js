'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Level.hasMany(models.Class, { foreignKey: 'levelId' })
    }
  };
  Level.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Name cannot be empty!' }
      }
    },
  }, {
    sequelize,
    modelName: 'Level',
  });
  return Level;
};