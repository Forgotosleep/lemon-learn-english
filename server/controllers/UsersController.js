const { User } = require("../models");
const { Op } = require("sequelize");
const { getPagingData } = require("../helpers/pagination");
const { decode } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.AUDIENCE);
class UsersController {
  static async readAllUsers(req, res, next) {
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
        attributes: {
          exclude: ["createdAt", "updatedAt", "role", "password"],
        },
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
      next(err);
    }
  }

  static async readOneUsers(req, res, next) {
    try {
      const { id } = req.user;
      const result = await User.findByPk(Number(id), {
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      });
      // if (!result) throw { name: "UserNotFound", id };
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { username, role, name, photo, phone, address } = req.body;
      const cekUser = await User.findByPk(Number(id));
      if (!cekUser) throw { name: "UserNotFound", id };
      const result = await User.update(
        { username, name, role, photo, phone, address },
        {
          where: {
            id: Number(id),
          },

          // returning: true,
        }
      );

      // const data = result[1][0];

      res.status(200).json({
        message: `User with id ${cekUser["id"]} has been updated`,
        // result: data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const cekUser = await User.findByPk(Number(id));
      // if (!cekUser) throw { name: "not found" };
      if (!cekUser) throw { name: "UserNotFound", id };
      await User.destroy({
        where: {
          id: Number(id),
        },
      });
      res
        .status(200)
        .json({ message: `User with id ${cekUser["id"]} has been deleted` });
    } catch (err) {
      next(err);
    }
  }

  static async newUser(req, res, next) {
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
      next(err);
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

  static async googleLogin(req, res, next) {
    try {
      const { token } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.AUDIENCE,
        // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = await ticket.getPayload();
      const userid = payload["sub"];
      const nameGoogle = payload.name;
      const emailFromGoogle = payload.email;
      const [user, isCreated] = await User.findOrCreate({
        where: {
          email: emailFromGoogle,
        },
        defaults: {
          username: nameGoogle,
          name: nameGoogle,
          email: emailFromGoogle,
          password: "password",
          role: "student",
        },
      });
      console.log(user);
      // console.log(isCreated);
      const payload2 = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };

      const token2 = await createToken(payload2);
      // const tokenFromServer = require("jsonwebtoken").sign(
      //   {
      //     id: user.id,
      //     email: user.email,
      //   },
      //   process.env.JWT_SECRET
      // );
      res.status(200).json({ access_token: token2 });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UsersController;
