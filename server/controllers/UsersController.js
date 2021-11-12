const { User } = require("../models");
const { Op } = require("sequelize");
const { getPagingData } = require("../helpers/pagination");
const { decode } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
class UsersController {
  static async readAllUsers(req, res) {
    try {
      const { username, email, phone, address, page, role } = req.query;
      let limit = req.query.limit || 10;
      let offset = 0;
      let order = req.query.order || "DESC";
      if (page) offset = limit * page - limit;

      let option = {
        order: [["id", order]],
        where: {},
        limit: limit,
        offset,
      };

      if (username) option.where["username"] = { [Op.iLike]: `%${username}%` };
      if (email) option.where["email"] = { [Op.iLike]: `%${email}%` };
      if (phone) option.where["phone"] = { [Op.iLike]: `%${phone}%` };
      if (address) option.where["address"] = { [Op.iLike]: `%${address}%` };
      if (role) option.where["role"] = { [Op.iLike]: `%${role}%` };

      const result = await User.findAndCountAll(option);
      const data = getPagingData(result, page, limit);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  }

  static async readOneUsers(req, res) {
    try {
      const { id } = req.params;
      const result = await User.findByPk(Number(id));
      if (!result) throw { name: "not found" };
      res.status(200).json(result);
    } catch (err) {
      if (err.name === "not found") {
        res.status(404).json({ message: "data not found" });
      } else {
        res.status(500).json({ message: "server error" });
      }
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { username, email, role, name, photo, phone, address } = req.body;
      const cekUser = await User.findByPk(Number(id));
      if (!cekUser) throw { name: "not found" };
      const result = await User.update(
        { username, name, role, photo, phone, address },
        {
          where: {
            id: Number(id),
          },
          returning: true,
        }
      );
      const data = result[1][0];
      res.status(200).json({
        message: `User with id ${cekUser["id"]} has been updated`,
        result: data,
      });
    } catch (err) {
      if (err.name === "not found") {
        res.status(404).json({ message: "data not found" });
      } else {
        res.status(500).json({ message: "server error" });
      }
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const cekUser = await User.findByPk(Number(id));
      if (!cekUser) throw { name: "not found" };
      await User.destroy({
        where: {
          id: Number(id),
        },
      });
      res
        .status(200)
        .json({ message: `User with id ${cekUser["id"]} has been deleted` });
    } catch (err) {
      console.log(err);
      if (err.name === "not found") {
        res.status(404).json({ message: "data not found" });
      } else {
        res.status(500).json({ message: "server error" });
      }
    }
  }

  static async newUser(req, res) {
    try {
      const { username, email, password, role, name, photo, phone, address } =
        req.body;

      const result = await User.create({
        username,
        email,
        password,
        role,
        name,
        photo,
        phone,
        address,
      });
      res.status(201).json({
        id: result["id"],
        username: result["username"],
        email: result["email"],
        role: result["role"],
        name: result["name"],
        photo: result["photo"],
        phone: result["phone"],
        address: result["address"],
      });
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        let message = err.errors.map((el) => el.message);
        res.status(400).json({ messages: message });
      } else if (err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: "email must unique" });
      } else {
        res.status(500).json({ message: "Server Error" });
      }
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const chekLogin = await User.findOne({ where: { email: email } });

      if (!chekLogin || !decode(password, chekLogin.password)) {
        throw { name: "LoginError" };
      } else {
        const payload = {
          id: chekLogin.id,
          email: chekLogin.email,
          name: chekLogin.name,
          role: chekLogin.role,
        };

        const token = createToken(payload);
        res.status(200).json({ access_token: token });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UsersController;
