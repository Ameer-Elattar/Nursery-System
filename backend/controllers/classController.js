const classSchema = require("../models/classModel");

exports.getAllclasses = (req, res, next) => {
  classSchema
    .find({})
    .populate({ path: "superID", select: { fullName: 1, _id: 0 } })
    .populate({ path: "childrenIDs", select: { fullName: 1, _id: 0 } })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => next(err));
};
exports.getClassByID = (req, res, next) => {
  classSchema
    .findById(req.params.id)
    .then((object) => {
      if (!object) {
        throw new Error("Class doesn't exist");
      }
      res.status(200).json({ object });
    })
    .catch((err) => next(err));
};
exports.deleteClassByID = (req, res, next) => {
  classSchema
    .findByIdAndDelete(req.params.id)
    .then((object) => {
      if (!object) throw new Error("class doesn't exist can't delete");
      res.status(200).json({ object });
    })
    .catch((err) => next(err));
};
exports.insertClass = (req, res, next) => {
  let object = new classSchema(req.body);
  object
    .save()
    .then(() => {
      res.status(200).json({ action: "class added successfully" });
    })
    .catch((err) => next(err));
};
exports.updateClass = (req, res, next) => {
  classSchema
    .findByIdAndUpdate(req.body._id, req.body)
    .then((object) => {
      if (!object) throw new Error("class doesn't exist can't update");
      res.status(200).json({ object });
    })
    .catch((err) => next(err));
};
exports.getClassChildrenInfo = (req, res, next) => {
  classSchema
    .findOne({ _id: req.params.id }, { childrenIDs: 1 })
    .populate({ path: "childrenIDs" })
    .then((object) => {
      if (!object) throw new Error("class doesn't exist");
      res.status(200).json({ object });
    })
    .catch((err) => next(err));
};
exports.getClassSupervisorInfo = (req, res, next) => {
  classSchema
    .findOne({ _id: req.params.id }, { superID: 1 })
    .populate({ path: "superID" })
    .then((object) => {
      if (!object) throw new Error("class doesn't exist");
      res.status(200).json({ object });
    })
    .catch((err) => next(err));
};
