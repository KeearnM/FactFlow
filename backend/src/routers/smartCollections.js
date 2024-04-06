const express = require("express");
const {
  seedSmartCollection,
  getAllSmartCollections,
  addSmartCollection,
  patchSmartCollection,
  deleteSmartCollection,
  getCollectionByUserID,
} = require("../controllers/smartCollections");
const {
  validateIdInParam,
  validateAddSmartCollectionData,
  validateUpdateSmartCollectionData,
} = require("../validators/smartCollections");
const { errorCheck } = require("../validators/errorCheck");
const router = express.Router();

router.get("/seed", seedSmartCollection);
router.get("/", getAllSmartCollections);
router.put(
  "/:id",
  validateIdInParam,
  validateAddSmartCollectionData,
  errorCheck,
  addSmartCollection
); // add collection to a specific auth object ID -- in req params or body?
router.patch(
  "/:id",
  validateIdInParam,
  validateUpdateSmartCollectionData,
  errorCheck,
  patchSmartCollection
);
router.delete("/:id", validateIdInParam, errorCheck, deleteSmartCollection);
router.get("/:id", validateIdInParam, errorCheck, getCollectionByUserID);

module.exports = router;
