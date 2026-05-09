const { body, query, validationResult } = require('express-validator');

// ─── Add School Validation Rules ──────────────────────────────────────────────
const addSchoolRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('School name is required'),

  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),

  body('latitude')
    .notEmpty()
    .withMessage('Latitude is required')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a valid number between -90 and 90'),

  body('longitude')
    .notEmpty()
    .withMessage('Longitude is required')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a valid number between -180 and 180'),
];

// ─── List Schools Validation Rules ────────────────────────────────────────────
const listSchoolsRules = [
  query('latitude')
    .notEmpty()
    .withMessage('Query latitude is required')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a valid number between -90 and 90'),

  query('longitude')
    .notEmpty()
    .withMessage('Query longitude is required')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a valid number between -180 and 180'),
];

// ─── Validation Result Handler ─────────────────────────────────────────────────
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

module.exports = { addSchoolRules, listSchoolsRules, validate };
