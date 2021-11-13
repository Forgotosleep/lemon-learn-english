const { User, Class, Task } = require("../models");

const authorizationAdmin = async (req, res, next) => {
  try {
    const role = req.user.role;
    if (role !== "admin") {
      throw { name: "Unauthorized" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

const authorizationTeacher = async (req, res, next) => {
  try {
    const role = req.user.role;
    if (role === "teacher" || role === "admin") {
      next();
    }
    else {
      throw { name: "Unauthorized" };
    }
  } catch (err) {
    next(err);
  }
};

const authorizationTaskMaterial = async (req, res, next) => {  // This is so that other Teachers can't edit or delete another teacher's tasks
  try {
    const teacherId = req.user.id
    const classId = req.params.id

    const teacherClass = await Class.findByPk(classId)
    // const user = await User.findByPk(teacherId)
    // console.log(teacherClass, "<<< TEACHER CLASS");
    console.log(req.user, "<<< REQ USER");

    if (teacherClass?.teacherId === teacherId || req.user?.role.toLowerCase() === "admin") {
      next()
    }
    else {
      throw { name: "Unauthorized" };
    }

  } catch (err) {
    next(err)
  }
}

const authorizationStudent = async (req, res, next) => {
  try {
    const role = req.user.role;
    if (role === "student" || role === "admin") {
      next();
    }
    else {
      throw { name: "Unauthorized" };
    }
  } catch (err) {
    next(err);
  }
};

const authorizatioUpdateUsers = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    const checkId = Number(req.params.id);
    if (role.toLowerCase() !== "admin") {
      if (checkId !== id) {
        throw { name: "Unauthorized" };
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authorizationAdmin,
  authorizationStudent,
  authorizationTeacher,
  authorizatioUpdateUsers,
  authorizationTaskMaterial,
};
