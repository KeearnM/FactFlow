const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    email: { type: String, require: true },
    hash: { type: String, require: true },
    role: { type: String, require: true, default: "user" },
    created_at: { type: Date, default: Date.now },
    smartCollections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SmartCollection",
      },
    ], //using an array of object because this is a one to many relationship
  },
  { collection: "auth" }
);

module.exports = mongoose.model("Auth", AuthSchema);
