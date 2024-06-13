const { body } = require('express-validator');

module.exports = [
  body('name')
    .notEmpty()
    .withMessage('This field is required')
    .isLength({ min: 1, max: 200 })
    .withMessage('Length of name must be between 1 and 200'),
  body('phone')
    .notEmpty()
    .withMessage('This field is required')
    .isNumeric({ no_symbols: true })
    .withMessage('Invalid phone number'),
  body('email')
    .notEmpty()
    .withMessage('This field is required')
    .isEmail()
    .withMessage('invalid email address'),
  body('companyIndustries')
    .notEmpty()
    .withMessage('This field is required')
    .isArray(),
  body('description')
    .notEmpty()
    .withMessage('This field is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Length of name must be between 10 and 500'),
  body('address')
    .notEmpty()
    .withMessage('This field is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Length of name must be between 10 and 500'),
];
