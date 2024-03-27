const express = require("express");
const controller = require("../controllers/teacherController");
const validator = require("../middleware/teacherValidator");
const validationResult = require("../middleware/validatorResult");
const router = express.Router();

router.get("/teachers/supervisors", controller.getSupervisors);
router
  .route("/teachers/:id")
  .get(controller.getTeacherByID)
  .delete(controller.deleteTeacherByID);
router
  .route("/teachers")
  .get(controller.getAllTeachers)
  .post(validator.insert, validationResult, controller.insertTeacher)
  .patch(validator.insert, validationResult, controller.updateTeacher);

module.exports = router;
