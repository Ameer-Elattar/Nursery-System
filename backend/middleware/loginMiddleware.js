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
