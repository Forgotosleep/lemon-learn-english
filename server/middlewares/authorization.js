async function teacherAuthz(req, res, next) {
  try {
    const { role } = req.user;

    if (role !== "teacher") {
      throw { name: "ErrorForbidden" };
    }

    next();
  } catch (err) {
    next(err);
  }
}

async function adminAuthz(req, res, next) {
  try {
    const { role } = req.user;

    if (role !== "admin") {
      throw { name: "ErrorForbidden" };
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { teacherAuthz, adminAuthz };
