const exprees = require("express");
const controller = require("../controllers/classController");
const router = exprees.Router();

router.get("/class/child/:id", controller.getClassChildrenInfo);
router.get("/class/teacher/:id", controller.getClassSupervisorInfo);

router
  .route("/class")
  .get(controller.getAllclasses)
  .post(controller.insertClass)
  .patch(controller.updateClass);
router
  .router("/class/:id")
  .get(controller.getClassByID)
  .delete(controller.deleteClassByID);

module.exports = router;
