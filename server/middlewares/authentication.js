const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = verifyToken(access_token);
    req.user = {
      id: payload.id,
      email: payload.email,
      name: payload.username,
      role: payload.role,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
