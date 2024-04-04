const express = require("express");
const {
  seedSmartCollection,
  getAllSmartCollections,
  addSmartCollection,
  patchSmartCollection,
  deleteSmartCollection,
} = require("../controllers/smartCollections");
const router = express.Router();

router.get("/seed", seedSmartCollection);
router.get("/", getAllSmartCollections);
router.put("/", addSmartCollection);
router.patch("/:id", patchSmartCollection);
router.delete("/:id", deleteSmartCollection);

module.exports = router;
