const mongoose = require("mongoose");

const SmartCollectionsSchema = new mongoose.Schema(
  {
    // users: {type: mongoose.Schema.Types.ObjectId
    // ref: "Auth"}
    topic: { type: String, required: true, minLength: 1, maxLength: 20 },
    from: {
      type: String,
      default: () => {
        const date = Date.now() - 14 * 24 * 60 * 60 * 1000;
        return new Date(date).toLocaleString();
      },
    },
    minClusterSize: { type: Number, min: 5 },
    sortBy: { type: String, default: "createdAt" },
  },
  { collection: "smartCollections" }
);

module.exports = mongoose.model("SmartCollections", SmartCollectionsSchema);
