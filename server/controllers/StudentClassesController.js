const { StudentClass, Class, User } = require("../models/index");
const { getPagingData } = require("../helpers/pagination");
const { Op } = require("sequelize");

class StudentClassController {
  static async addStudentClass(req, res, next) {
    try {
      const maxClass = 30;
      const { id } = req.user;
      const { classId } = req.params;
      if (!Number(classId)) throw { name: "InvalidDataType" };
      const classData = await Class.findByPk(classId);
      if (!classData) throw { name: "ClassNotFound", id: classId };
      const checkMaxClass = await StudentClass.findAll({ where: { classId, status: "incomplete" } });
      if (checkMaxClass.length > maxClass) throw { name: "maxStudentClass" };
      const checkResgiter = await StudentClass.findOne({ where: { studentId: id, status: "incomplete" } });
      if (checkResgiter) throw { name: "register" };
      const resp = await StudentClass.create({
        studentId: id,
        classId,
        status: "incomplete",
      });
      res.status(201).json({ message: "Success add student to the class" });
    } catch (err) {
      next(err);
    }
  }

  static async updateStudentIncomplete(req, res, next) {
    try {
      const { id } = req.params;
      const { id: studentId } = req.user;
      if (!Number(id)) throw { name: "InvalidDataType" };
      const studentClassData = await StudentClass.findByPk(id);
      if (!studentClassData) throw { name: "StudentClassNotFound", id: id };
      if (studentClassData["studentId"] !== studentId) throw { name: "Unauthorized" };
      const resp = await StudentClass.update(
        {
          status: "incomplete",
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({ messsage: "Success update status" });
    } catch (err) {
      next(err);
    }
  }

  static async updateStudentHidden(req, res, next) {
    try {
      const { id } = req.params;
      const { id: studentId } = req.user;
      if (!Number(id)) throw { name: "InvalidDataType" };
      const studentClassData = await StudentClass.findByPk(Number(id));
      if (!studentClassData) throw { name: "StudentClassNotFound", id };
      if (studentClassData["studentId"] !== studentId) throw { name: "Unauthorized" };

      const resp = await StudentClass.update(
        {
          status: "hidden",
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({ messsage: "Success update status" });
    } catch (err) {
      next(err);
    }
  }

  static async getStudentEnrolledClass(req, res, next) {
    try {
      const { status, studentName, page } = req.query;
      const { classId } = req.params;
      const { id } = req.user;
      if (!Number(classId)) throw { name: "InvalidDataType" };
      const classData = await Class.findByPk(classId);
      if (!classData) throw { name: "ClassNotFound", id: classId };
      if (classData["teacherId"] !== id) throw { name: "Unauthorized" };

      let limit = req.query.limit || 10;
      let offset = 0;
      if (page) offset = limit * page - limit;
      let option = {
        where: {
          classId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: User,
          as: "student",
          where: {},
          attributes: {
            exclude: ["createdAt", "updatedAt", "role", "password"],
          },
        },
        limit: limit,
        offset,
      };
      if (status) option["where"]["status"] = status;
      if (studentName) option["include"]["where"]["name"] = { [Op.iLike]: `%${studentName}%` };
      const result = await StudentClass.findAndCountAll(option);
      const data = getPagingData(result, page, limit);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getClassEnrolled(req, res, next) {
    try {
      const { id } = req.user;
      if (!Number(id)) throw { name: "InvalidDataType" };
      const resp = await StudentClass.findAll({
        where: {
          studentId: id,
        },
        include: {
          model: Class,
        },
      });
      res.status(200).json(resp);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = StudentClassController;
