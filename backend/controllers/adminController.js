const adminSchema = require("../models/adminModel");
exports.addAdmin = (req, res, next) => {
  let object = new adminSchema(req.body);
  object
    .save()
    .then(() => {
      res.status(200).json({ action: "Admin Add Successfully" });
    })
    .catch((err) => next(err));
};
