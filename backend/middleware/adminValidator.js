const { body } = require("express-validator");

exports.insert = [
  body("fullName")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Admin Name is String"),
  body("password").isString().withMessage("password is String"),
];
