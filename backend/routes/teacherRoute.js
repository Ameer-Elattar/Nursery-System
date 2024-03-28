const express = require("express");
const controller = require("../controllers/teacherController");
const validator = require("../middleware/teacherValidator");
const validationResult = require("../middleware/validatorResult");
const router = express.Router();

router.get("/teachers/supervisors", controller.getSupervisors);
router
  .route("/teachers/changePassword")
  .patch(
    validator.changePassword,
    validationResult,
    controller.changeTeacherPassword
  );
router
  .route("/teachers/:id")
  .get(controller.getTeacherByID)
  .delete(controller.deleteTeacherByID);
router
  .route("/teachers")
  .get(controller.getAllTeachers)
  .post(
    controller.upload.single("file"),
    validator.insert,
    validationResult,
    controller.insertTeacher
  )
  .patch(
    controller.upload.single("file"),
    validator.update,
    validationResult,
    controller.updateTeacher
  );

module.exports = router;
