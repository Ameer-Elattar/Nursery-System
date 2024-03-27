const { body, param } = require("express-validator");

exports.insert = [
  body("_id").isMongoId().withMessage("teacher id should be object ID"),
  body("fullName")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("teacher full name should be String")
    .isLength({ min: 4 })
    .withMessage("name length should be more that 4 "),
  body("password")
    .isString()
    .withMessage("password should be String")
    .isLength({ min: 4 })
    .withMessage("password length should be more that 4 "),
  body("email").isEmail().withMessage("invalid email"),
  body("image").isString().withMessage("image should be entered as string"),
];
exports.update = [
  body("_id").isMongoId().withMessage("teacher id should be object ID"),
  body("fullName")
    .optional()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("teacher full name should be String")
    .isLength({ min: 4 })
    .withMessage("name length should be more that 4 "),
  body("password")
    .optional()
    .isString()
    .withMessage("password should be String")
    .isLength({ min: 4 })
    .withMessage("password length should be more that 4 "),
  body("email").optional().isEmail().withMessage("invalid email"),
  body("image")
    .optional()
    .isString()
    .withMessage("image should be entered as string"),
];

//teacher Data: _id(objectID), fullname,password, email , image (which is string)
