const express = require("express");
const controller = require("../controllers/teacherController");
const validator = require("../middleware/teacherValidator");
const validationResult = require("../middleware/validatorResult");
const { isAdmin, isAdminOrTeacher } = require("../middleware/loginMiddleware");
const router = express.Router();

router.get("/teachers/supervisors", isAdmin, controller.getSupervisors);
router
  .route("/teachers/changePassword")
  .patch(
    isAdmin,
    validator.changePassword,
    validationResult,
    controller.changeTeacherPassword
  );
router
  .route("/teachers/:id")
  .get(isAdmin, controller.getTeacherByID)
  .delete(isAdmin, controller.deleteTeacherByID);
router
  .route("/teachers")
  .get(isAdmin, controller.getAllTeachers)
  .post(
    isAdmin,
    controller.upload.single("file"),
    validator.insert,
    validationResult,
    controller.insertTeacher
  )
  .patch(
    isAdminOrTeacher,
    controller.upload.single("file"),
    validator.update,
    validationResult,
    controller.updateTeacher
  );

module.exports = router;
