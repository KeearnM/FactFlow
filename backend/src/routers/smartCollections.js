const express = require("express");
const {
  seedSmartCollection,
  getAllSmartCollections,
  addSmartCollection,
} = require("../controllers/smartCollections");
const router = express.Router();

router.get("/seed", seedSmartCollection);
router.get("/", getAllSmartCollections);
router.put("/", addSmartCollection);

module.exports = router;
