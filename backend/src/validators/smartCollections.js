const { body, param } = require("express-validator");

const validateIdInParam = [
  param("id", "id is required").not().isEmpty(),
  param("id", "id is invalid").isLength({ min: 24, max: 24 }),
];

const validateIdInBody = [
  body("id", "id is required").not().isEmpty(),
  body("id", "id is invalid").isLength({ min: 24, max: 24 }),
];

const validateAddSmartCollectionData = [
  body("topic", "topic is required").not().isEmpty(),
  body("topic", "must have a min of 1 and a max of 20 characters").isLength({
    min: 1,
    max: 20,
  }),
];

const validateUpdateSmartCollectionData = [
  body("topic", "topic is required").not().isEmpty(), // optional() is to validate for optional parts of the request payload
  body("topic", "must have a min of 1 and a max of 20 characters").isLength({
    min: 1,
    max: 20,
  }),
];

module.exports = {
  validateIdInParam,
  validateIdInBody,
  validateAddSmartCollectionData,
  validateUpdateSmartCollectionData,
};
