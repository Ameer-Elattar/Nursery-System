const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const embeddedAddress = new mongoose.Schema(
  {
    city: String,
    street: Number,
    building: Number,
  },
  { _id: false }
);
const schema = mongoose.Schema({
  _id: Number,
  fullName: String,
  age: Number,
  level: String,
  address: embeddedAddress,
});

schema.plugin(autoIncrement, { id: "child_id" });
module.exports = mongoose.model("children", schema);
