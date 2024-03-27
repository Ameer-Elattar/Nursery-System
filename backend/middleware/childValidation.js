const { body } = require("express-validator");

exports.insert = [
  body("fullName")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("child full name should be String")
    .isLength({ min: 4 })
    .withMessage("name length should be more that 4 "),
  body("age")
    .isInt({ min: 5, max: 12 })
    .withMessage("child is a number between 5 and 12"),
  body("level")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("level must be one of these [PreKG, KG1, KG2]"),
  body("address").isObject().withMessage("address type is an object"),
  body("address.city").isAlpha().withMessage("enter a valid city name"),
  body("address.street").isInt().withMessage("street is a number"),
  body("address.building").isInt().withMessage("building is a number"),
];
exports.update = [
  body("_id").isInt().withMessage("child ID is a number"),
  body("fullName")
    .optional()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("child full name should be String")
    .isLength({ min: 4 })
    .withMessage("name length should be more that 4 "),
  body("age")
    .optional()
    .isInt({ min: 5, max: 12 })
    .withMessage("child is a number between 5 and 12"),
  body("level")
    .optional()
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("level must be one of these [PreKG, KG1, KG2]"),
  body("address")
    .optional()
    .isObject()
    .withMessage("address type is an object"),
  body("address.city")
    .optional()
    .isAlpha()
    .withMessage("enter a valid city name"),
  body("address.street").optional().isInt().withMessage("street is a number"),
  body("address.building")
    .optional()
    .isInt()
    .withMessage("building is a number"),
];

//: _id(Number), fullName, age , level (one of PreKG,KG1,KG2), address(city,street and building)
