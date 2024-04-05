const RoleModel = require("../models/Roles");

const seedRole = async (req, res) => {
  try {
    await RoleModel.deleteMany({});

    await RoleModel.create([
      {
        _id: "66100b626d6defdb0da425be",
        role: "admin",
      },
      {
        _id: "66100b626d6defdb0da425bf",
        role: "user",
      },
    ]);
    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "seeding error" });
  }
};

module.exports = { seedRole };
