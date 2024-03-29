const express = require("express");
const controller = require("../controllers/adminController");
const validator = require("../middleware/adminValidator");
const validatorResult = require("../middleware/validatorResult");
const router = express.Router();

router
  .route("/admin")
  .post(validator.insert, validatorResult, controller.addAdmin);

module.exports = router;
