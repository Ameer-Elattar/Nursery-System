const teacherSchema = require("../models/teacherModel");
const adminSchema = require("../models/adminModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.adminLogin = (req, res, next) => {
  adminSchema
    .findOne({ fullName: req.body.fullName })
    .then((object) => {
      if (!object) next();
      else {
        bcryptjs
          .compare(req.body.password, object.password)
          .then((result) => {
            if (!result) throw new Error("Not Authenticated");
            let token = jwt.sign(
              {
                _id: object._id,
                role: "admin",
              },
              process.env.SECRETKEY,
              { expiresIn: "1hr" }
            );
            res.status(200).json({ action: "Authenticated", token });
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};

exports.teacherLogin = (req, res, next) => {
  teacherSchema
    .findOne({ fullName: req.body.fullName })
    .then((object) => {
      if (!object) throw new Error("Not Authenticated");
      bcryptjs
        .compare(req.body.password, object.password)
        .then((result) => {
          if (!result) throw new Error("Not Authenticated");
          let token = jwt.sign(
            {
              _id: object._id,
              role: "teacher",
            },
            process.env.SECRETKEY,
            { expiresIn: "1hr" }
          );
          res.status(200).json({ action: "Authenticated", token });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
