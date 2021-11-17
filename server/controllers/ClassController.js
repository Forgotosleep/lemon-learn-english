const {
  Class,
  User,
  Level,
  Category,
  StudentClass,
  Task,
} = require("../models");
const { getPagingData } = require("../helpers/pagination");
const { Op } = require("sequelize");
class ClassController {
  static async findAllClass(req, res, next) {
    try {
      const { name, categoryId, levelId, page, teacherName } = req.query;

      let limit = req.query.limit || 10;
      let offset = 0;
      if (page) offset = limit * page - limit;
      let option = {
        include: [
          {
            model: User,
            where: {},
            as: "teacher",
            attributes: {
              exclude: ["createdAt", "updatedAt", "role", "password"],
            },
          },
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Level,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        order: [["id", "DESC"]],
        where: {},
        limit: limit,
        offset,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      };
      if (teacherName)
        option["include"][0]["where"]["name"] = {
          [Op.iLike]: `%${teacherName}%`,
        };
      if (categoryId) option["where"]["categoryId"] = { [Op.eq]: categoryId };
      if (levelId) option["where"]["levelId"] = { [Op.eq]: levelId };
      if (name) option["where"]["name"] = { [Op.iLike]: `%${name}%` };

      const result = await Class.findAndCountAll(option);
      const data = getPagingData(result, page, limit);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async findActiveClass(req, res, next) {
    try {
      const { name, categoryId, levelId, page, teacherName } = req.query;

      let limit = req.query.limit || 10;
      let offset = 0;
      if (page) offset = limit * page - limit;
      let option = {
        include: [
          {
            model: User,
            where: {},
            as: "teacher",
            attributes: {
              exclude: ["createdAt", "updatedAt", "role", "password"],
            },
          },
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Level,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: StudentClass,
          },
        ],
        order: [["ratings", "DESC"]],
        where: { status: "active" },
        limit: limit,
        offset,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        distinct: true,
      };
      if (teacherName)
        option["include"][0]["where"]["name"] = {
          [Op.iLike]: `%${teacherName}%`,
        };
      if (categoryId) option["where"]["categoryId"] = { [Op.eq]: categoryId };
      if (levelId) option["where"]["levelId"] = { [Op.eq]: levelId };
      if (name) option["where"]["name"] = { [Op.iLike]: `%${name}%` };

      const result = await Class.findAndCountAll(option);
      const data = getPagingData(result, page, limit);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async findClassByTeacherId(req, res, next) {
    try {
      const teacherId = req.user.id;
      const result = await Class.findAll({
        include: [
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Level,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: StudentClass,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Task,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        where: {
          teacherId,
        },
        distinct: true,
        order: [["id", "desc"]],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async rateClass(req, res, next) {
    try {
      const studentId = +req.user.id;
      const { id } = req.params;
      const { ratings } = req.body;

      const checkStatus = await StudentClass.findOne({
        where: {
          studentId,
          classId: Number(id),
        },
      });

      if (!checkStatus) {
        throw { name: "ClassNotFound", id };
      }

      if (checkStatus["status"].toLowerCase() !== "complete")
        throw { name: "notCompletedClass" };

      const result = await Class.findByPk(+id);
      if (!result) throw { name: "ClassNotFound", id };

      // Later in Client-side, the total ratings (ratings in the table) will be divided with the total number of students that has completed the class
      let newRatings = Number(result.ratings) + Number(ratings);

      await Class.update(
        {
          ratings: newRatings,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );
      res
        .status(200)
        .json({ message: `Succeess in rating class ${result["name"]}` });
    } catch (err) {
      next(err);
    }
  }

  static async findOneClass(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Class.findByPk(id, {
        include: [
          {
            model: User,
            as: "teacher",
            attributes: {
              exclude: ["createdAt", "updatedAt", "role", "password"],
            },
          },
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Level,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });

      if (!result) {
        // IF CLASS NOT FOUND
        throw { name: "ClassNotFound", id };
      }

      // IF CLASS IS FOUND
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async addClass(req, res, next) {
    try {
      const { name, levelId, categoryId } = req.body;
      const teacherId = req.user.id;
      const checkClass = await Class.findOne({
        where: {
          teacherId: teacherId,
          levelId: Number(levelId),
          categoryId: Number(categoryId),
        },
      });
      console.log(checkClass);
      if (checkClass) throw { name: "duplicate class" };

      const result = await Class.create({
        name,
        teacherId,
        levelId,
        categoryId,
      });
      // IF CLASS IS CREATED
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async updateClass(req, res, next) {
    try {
      const { id } = req.params;
      const { name, teacherId, levelId, categoryId } = req.body;
      const result = await Class.update(
        {
          name,
          teacherId,
          levelId,
          categoryId,
        },
        {
          where: { id },
          returning: true,
        }
      );

      // IF CLASS NOT FOUND
      if (!result[0]) {
        throw { name: "ClassNotFound", id };
      }

      // IF CLASS IS UPDATED
      res.status(200).json(result[1][0]);
    } catch (err) {
      next(err);
    }
  }

  static async updateStatusClass(req, res, next) {
    try {
      const { id } = req.params;
      const teacherId = req.user.id;
      const { status } = req.body;
      const result = await Class.findByPk(id);
      if (!result) throw { name: "ClassNotFound", id };

      console.log(req.user.id, "<<< teach ID");
      console.log(result.teacherId, "<<< result's teach ID");

      if (result) {
        if (result.teacherId !== teacherId) throw { name: "Unauthorized" };
      }
      await Class.update(
        {
          status,
        },
        {
          where: { id },
        }
      );
      res.status(200).json({ message: "Your class status has been updated" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteClass(req, res, next) {
    try {
      const { id } = req.params;
      const teacherId = req.user.id;
      const result = await Class.findByPk(id);

      if (!result) {
        // IF CLASS NOT FOUND
        throw { name: "ClassNotFound", id };
      }

      if (result && req.user.role !== "admin") {
        if (result.teacherId !== teacherId) throw { name: "Unauthorized" };
      }

      // IF CLASS IS FOUND
      const destroyed = Class.destroy({
        where: { id },
      });
      res
        .status(200)
        .json({ message: `Successfully deleted Class ${result.name}` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ClassController;
