//:_id(Number), name, supervisor (teacher id number), children which is array of children ids
const { body } = require("express-validator");

exports.insert = [
  body("name")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("class name should be String")
    .notEmpty({}),
  body("superID").isMongoId().withMessage("SuperID is a number"),
  body("childrenIDs").isArray().withMessage("childrensIDs is array of IDs"),
  body("childrensIDs.*").isInt().withMessage("values of childrensID is number"),
];
exports.update = [
  body("_id").isInt().withMessage("class ID is a number"),
  body("name")
    .optional()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("class name should be String")
    .notEmpty({}),
  body("superID").optional().isMongoId().withMessage("SuperID is a number"),
  body("childrenIDs")
    .optional()
    .isArray()
    .withMessage("childrensIDs is array of IDs"),
  body("childrensID.*")
    .optional()
    .isInt()
    .withMessage("values of childrensID is number"),
];
