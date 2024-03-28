const bcryptjs = require("bcryptjs");
const multer = require("multer");
const FS = require("fs");
const storage = multer.memoryStorage();
const teacherSchema = require("../models/teacherModel");
const classSchema = require("../models/classModel");

exports.upload = multer({ storage: storage });
exports.getAllTeachers = (req, res, next) => {
  teacherSchema
    .find({})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => next(err));
};
exports.getTeacherByID = (req, res, next) => {
  teacherSchema
    .findOne({ _id: req.params.id })
    .then((object) => {
      if (!object) {
        throw new Error("Teacher not Exist");
      }
      res.status(200).json({ object });
    })
    .catch((err) => next(err));
};
exports.deleteTeacherByID = (req, res, next) => {
  teacherSchema
    .findByIdAndDelete(req.params.id)
    .then((object) => {
      if (!object) {
        throw new Error("Teacher not Exist Can't delete");
      }
      const imagePath = `./public/teacher/${object.image}`;
      FS.unlink(imagePath, (err) => {
        if (err) {
          return next(err);
        }
      });
      res.status(200).json(object);
    })
    .catch((err) => next(err));
};
exports.insertTeacher = (req, res, next) => {
  let object = new teacherSchema(req.body);
  object.image = `${Date.now()}-${Math.random()}-${req.file.originalname}`;
  object
    .save()
    .then(() => {
      res.status(200).json({ action: "record added successfully" });
      FS.writeFile(
        `./public/teacher/${object.image}`,
        req.file.buffer,
        (err) => {
          return next(err);
        }
      );
    })
    .catch((err) => next(err));
};
exports.updateTeacher = (req, res, next) => {
  const { password, ...updatedbody } = req.body;
  updatedbody.image = `${Date.now()}-${Math.random()}-${req.file.originalname}`;
  teacherSchema
    .findByIdAndUpdate(updatedbody._id, updatedbody)
    .then((object) => {
      res
        .status(200)
        .json({ object, ps: "password cant be updated from here" });
      FS.writeFile(
        `./public/teacher/${object.image}`,
        req.file.buffer,
        (err) => {
          return next(err);
        }
      );
    })
    .catch((err) => next(err));
};
exports.changeTeacherPassword = (req, res, next) => {
  bcryptjs.genSalt().then((salt) => {
    bcryptjs.hash(req.body.password, salt).then((hash) => {
      req.body.password = hash;
      teacherSchema
        .updateOne({ _id: req.body._id }, { password: req.body.password })
        .then(() => {
          res.status(200).json({ data: "updated successfully" });
        })
        .catch((err) => next(err));
    });
  });
};
exports.getSupervisors = (req, res, next) => {
  classSchema
    .find({}, { superID: 1 })
    .populate({ path: "superID" })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => next(err));
};
