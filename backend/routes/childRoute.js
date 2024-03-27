const express = require("express");
const controller = require("../controllers/childController");
const router = express.Router();

router
  .route("/child")
  .get(controller.getAllChildren)
  .post(controller.insertChild)
  .patch(controller.updateChild);
router
  .route("/child/:id")
  .get(controller.getChildByID)
  .delete(controller.deleteChildByID);

module.exports = router;
