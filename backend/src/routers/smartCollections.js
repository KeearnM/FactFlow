const express = require("express");
const {
  seedSmartCollection,
  getAllSmartCollections,
} = require("../controllers/smartCollections");
const router = express.Router();

router.get("/seed", seedSmartCollection);
router.get("/", getAllSmartCollections);

module.exports = router;
