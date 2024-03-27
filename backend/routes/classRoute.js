const exprees = require("express");
const controller = require("../controllers/classController");
const validator = require("../middleware/classValidator");
const validatorResult = require("../middleware/validatorResult");
const router = exprees.Router();

router.get("/class/child/:id", controller.getClassChildrenInfo);
router.get("/class/teacher/:id", controller.getClassSupervisorInfo);

router
  .route("/class")
  .get(controller.getAllclasses)
  .post(validator.insert, validatorResult, controller.insertClass)
  .patch(validator.update, validatorResult, controller.updateClass);
router
  .route("/class/:id")
  .get(controller.getClassByID)
  .delete(controller.deleteClassByID);

module.exports = router;
