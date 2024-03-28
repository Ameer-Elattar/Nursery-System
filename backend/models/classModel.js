const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = mongoose.Schema({
  _id: Number,
  name: String,
  superID: { type: mongoose.Types.ObjectId, ref: "teachers" },
  childrenIDs: [{ type: Number, ref: "children" }],
});

schema.plugin(autoIncrement, { id: "classID" });
module.exports = mongoose.model("classes", schema);
