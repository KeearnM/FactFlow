const express = require("express");
const { seedRole } = require("../controllers/role");

const router = express.Router();

router.get("/seed", seedRole);

module.exports = router;
