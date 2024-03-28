const childSchema = require("../models/childModel");
const multer = require("multer");
const FS = require("fs");
const storage = multer.memoryStorage();
exports.upload = multer({ storage: storage });

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
      const imagePath = `./public/child/${object.image}`;
      FS.unlink(imagePath, (err) => {
        if (err) {
          return next(err);
        }
      });
      res.status(200).json(object);
    })
    .catch((err) => next(err));
};
exports.insertChild = (req, res, next) => {
  let object = new childSchema(req.body);
  object.image = `${Date.now()}-${Math.random()}-${req.file.originalname}`;
  object
    .save()
    .then(() => {
      res.status(200).json({ action: "record added successfully" });
      console.log(object);
      FS.writeFile(`./public/child/${object.image}`, req.file.buffer, (err) => {
        return next(err);
      });
    })
    .catch((err) => next(err));
};
exports.updateChild = (req, res, next) => {
  req.body.image = `${Date.now()}-${Math.random()}-${req.file.originalname}`;
  childSchema
    .findByIdAndUpdate(req.body._id, req.body)
    .then((object) => {
      if (!object) {
        throw new Error("Child not Exist Can't update");
      }
      res.status(200).json({ object });
      FS.writeFile(`./public/child/${object.image}`, req.file.buffer, (err) => {
        return next(err);
      });
    })
    .catch((err) => next(err));
};
