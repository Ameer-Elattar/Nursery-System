const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    let token = req.get("authorization").split(" ")[1];
    let decodedToken = jwt.verify(token, process.env.SECRETKEY);
    req.token = decodedToken;
    next();
  } catch (err) {
    err.message = "Not authenticated ";
    next(err);
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.token.role === "admin") next();
  else throw new Error("Unautherized for this action");
};
exports.isAdminOrTeacher = (req, res, next) => {
  if (req.token.role === "admin" || req.token.role === "teacher") next();
  else throw new Error("Unautherized for this action");
};
