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
      role: req.body.role || "user",
    }); // this creates a hash from the password in the request body and add it to our schema
    res.json({ status: "ok", msg: "user created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid registration" });
  }
};

const login = async (req, res) => {
  try {
    const auth = await AuthModel.findOne({ email: req.body.email });
    if (!auth) {
      return res.status(400).json({ status: "error", msg: "no email found" });
    } //check whether the email/account exist in the database

    //the following code check whether the password matches the one in the db
    const check = await bcrypt.compare(req.body.password, auth.hash); //check entered password against db password
    if (!check) {
      console.error("invalid password or email");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    //store the payload inside 'claims'
    const claims = {
      email: auth.email,
      role: auth.role,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (error) {}
};

module.exports = { register, login };
