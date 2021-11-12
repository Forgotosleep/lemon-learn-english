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
    if (role !== "teacher") {
      throw { name: "Unauthorized" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

const authorizationStudent = async (req, res, next) => {
  try {
    const role = req.user.role;
    if (role !== "Student") {
      throw { name: "Unauthorized" };
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
};
