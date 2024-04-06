const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  role: { type: String, require: true },
});

module.exports = mongoose.model("Role", RoleSchema);
