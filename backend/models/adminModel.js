const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const bcryptjs = require("bcryptjs");

const schema = mongoose.Schema({
  _id: Number,
  fullName: String,
  password: String,
});

schema.plugin(autoIncrement, { id: "adminID" });
schema.pre("save", function (next) {
  bcryptjs
    .genSalt()
    .then((salt) => {
      bcryptjs.hash(this.password, salt).then((hash) => {
        this.password = hash;
        next();
      });
    })
    .catch((err) => next(err));
});

module.exports = mongoose.model("administrators", schema);
