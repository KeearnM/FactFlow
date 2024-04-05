const express = require("express");
const {
  register,
  login,
  refresh,
  seedUsers,
  getAllAuth,
  update,
} = require("../controllers/auth");
const { errorCheck } = require("../validators/errorCheck");
const {
  validateLogin,
  validateRegister,
  validateRefresh,
} = require("../validators/auth");

const router = express.Router();

router.put("/register", validateRegister, errorCheck, register);
router.post("/login", validateLogin, errorCheck, login);
router.post("/refresh", validateRefresh, errorCheck, refresh);
router.get("/seed", seedUsers);
router.get("/allUser", getAllAuth);
router.get("/update/:id", validateRegister, errorCheck, update);

module.exports = router;
