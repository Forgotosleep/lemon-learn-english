"use strict";
const { Model } = require("sequelize");
const { encode } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Class, {
        through: models.StudentClass,
        as: "Student",
        foreignKey: "studentId",
      });
      User.hasMany(models.Score, { foreignKey: "studentId" });
      User.hasMany(models.Class), { as: "Teacher", foreignKey: "teacherId" };
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Email can't be empty` },
          notNull: { msg: `Email can't be empty` },
          isEmail: { msg: `Please enter a valid email` },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Password can't be empty` },
          notNull: { msg: `Password can't be empty` },
          passwordLength(value) {
            if (value.length < 5) {
              throw new Error("Password length must be more than 5 characters");
            }
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Role can't be empty` },
          notNull: { msg: `Role can't be empty` },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Name can't be empty` },
          notNull: { msg: `Name can't be empty` },
        },
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "https://cdn.onlinewebfonts.com/svg/img_181369.png",
        validate: {
          notEmpty: { msg: `Photo can't be empty` },
          notNull: { msg: `Photo can't be empty` },
        },
      },
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user, options) => {
          user.password = encode(user.password);
        },
      },
    }
  );
  return User;
};
