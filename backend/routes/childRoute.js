const express = require("express");
const controller = require("../controllers/childController");
const validator = require("../middleware/childValidation");
const validationResult = require("../middleware/validatorResult");
const router = express.Router();

router
  .route("/child")
  .get(controller.getAllChildren)
  .post(
    controller.upload.single("file"),
    validator.insert,
    validationResult,
    controller.insertChild
  )
  .patch(
    controller.upload.single("file"),
    validator.update,
    validationResult,
    controller.updateChild
  );
router
  .route("/child/:id")
  .get(controller.getChildByID)
  .delete(controller.deleteChildByID);

module.exports = router;
