const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const schema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  fullName: { type: String },
  password: { type: String },
  email: { type: String, unique: true },
});

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

module.exports = mongoose.model("teachers", schema);
