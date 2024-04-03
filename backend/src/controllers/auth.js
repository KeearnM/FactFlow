const AuthModel = require("../models/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const Auth = require("../models/Auth");

const register = async (req, res) => {
  try {
    const auth = await AuthModel.findOne({ email: req.body.email });
    if (auth) {
      return res.status(400).json({ status: "error", msg: "duplicated email" });
    } // this check against the schema for any existing emails

    const hash = await bcrypt.hash(req.body.password, 12);
    await AuthModel.create({
      email: req.body.email,
      hash,
      roles: req.body.role || "user",
    }); // this creates a hash from the password in the request body and add it to our schema
    res.json({ status: "ok", msg: "user created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid registration" });
  }
};

module.exports = { register };
