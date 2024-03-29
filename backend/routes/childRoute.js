const express = require("express");
const controller = require("../controllers/childController");
const validator = require("../middleware/childValidation");
const validationResult = require("../middleware/validatorResult");
const { isAdmin, isAdminOrTeacher } = require("../middleware/loginMiddleware");

const router = express.Router();

router
  .route("/child")
  .get(isAdminOrTeacher, controller.getAllChildren)
  .post(
    isAdmin,
    controller.upload.single("file"),
    validator.insert,
    validationResult,
    controller.insertChild
  )
  .patch(
    isAdminOrTeacher,
    controller.upload.single("file"),
    validator.update,
    validationResult,
    controller.updateChild
  );
router
  .route("/child/:id")
  .get(isAdminOrTeacher, controller.getChildByID)
  .delete(isAdmin, controller.deleteChildByID);

module.exports = router;
