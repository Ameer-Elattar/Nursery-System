const childSchema = require("../models/childModel");

exports.getAllChildren = (req, res, next) => {
  childSchema
    .find({})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => next(err));
};
exports.getChildByID = (req, res, next) => {
  childSchema
    .findById(req.params.id)
    .then((object) => {
      if (!object) {
        throw new Error("Teacher not Exist");
      }
      res.status(200).json({ object });
    })
    .catch((err) => next(err));
};
exports.deleteChildByID = (req, res, next) => {
  childSchema
    .findByIdAndDelete(req.params.id)
    .then((object) => {
      if (!object) {
        throw new Error("Child not Exist Can't delete");
      }
      res.status(200).json(object);
    })
    .catch((err) => next(err));
};
exports.insertChild = (req, res, next) => {
  let object = new childSchema(req.body);
  object
    .save()
    .then(() => {
      res.status(200).json({ action: "record added successfully" });
    })
    .catch((err) => next(err));
};
exports.updateChild = (req, res, next) => {
  childSchema
    .findByIdAndUpdate(req.body._id, req.body)
    .then((object) => {
      if (!object) {
        throw new Error("Child not Exist Can't update");
      }
      res.status(200).json({ object });
    })
    .catch((err) => next(err));
};
