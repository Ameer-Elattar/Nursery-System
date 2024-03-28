const { body } = require("express-validator");
const teacherSchema = require("../models/teacherModel");
const childSchema = require("../models/childModel");

exports.insert = [
  body("name")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("class name should be String")
    .notEmpty({}),
  body("superID")
    .isMongoId()
    .withMessage("SuperID is a number")
    .custom((value) => {
      return teacherSchema.findOne({ _id: value }).then((object) => {
        if (!object) throw new Error("this supervisor doesn't exist");
      });
    }),
  body("childrenIDs")
    .isArray()
    .withMessage("childrensIDs is array of IDs")
    .custom((value) => {
      return childSchema
        .find({
          _id: {
            $in: value,
          },
        })
        .then((data) => {
          if (data.length != value.length)
            throw new Error("pls cheack the entered IDs"); // need another look
        });
    }),
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
