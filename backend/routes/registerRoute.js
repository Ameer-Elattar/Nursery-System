const express = require("express");
const controller = require("../controllers/teacherController");
const validator = require("../middleware/teacherValidator");
const validatorResult = require("../middleware/validatorResult");
const router = express.Router();

router
  .route("/register")
  .post(
    controller.upload.single("file"),
    validator.insert,
    validatorResult,
    controller.insertTeacher
  );
module.exports = router;
