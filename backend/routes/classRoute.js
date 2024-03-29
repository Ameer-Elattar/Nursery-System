const exprees = require("express");
const controller = require("../controllers/classController");
const validator = require("../middleware/classValidator");
const validatorResult = require("../middleware/validatorResult");
const { isAdmin, isAdminOrTeacher } = require("../middleware/loginMiddleware");

const router = exprees.Router();

router.get("/class/child/:id", isAdmin, controller.getClassChildrenInfo);
router.get("/class/teacher/:id", isAdmin, controller.getClassSupervisorInfo);

router
  .route("/class")
  .get(isAdminOrTeacher, controller.getAllclasses)
  .post(isAdmin, validator.insert, validatorResult, controller.insertClass)
  .patch(isAdmin, validator.update, validatorResult, controller.updateClass);
router
  .route("/class/:id")
  .get(isAdminOrTeacher, controller.getClassByID)
  .delete(isAdmin, controller.deleteClassByID);

module.exports = router;
