const mongoose = require("mongoose");

const SmartCollectionsSchema = new mongoose.Schema(
  {
    // title: { type: String, require: true, minLength: 1, maxLength: 50 },
    // author: { type: String, require: true, minLength: 1, maxLength: 50 },
    // year_published: { type: Number, require: true, min: 1900 },
    // created_at: { type: Date, default: Date.now },
  },
  { collection: "smartCollections" }
);

module.exports = mongoose.model("SmartCollections", SmartCollectionsSchema);
