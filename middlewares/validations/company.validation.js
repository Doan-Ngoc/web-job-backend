const { body } = require('express-validator');

module.exports = [
  body('name')
    .notEmpty()
    .withMessage('this field is required')
    .isLength({ min: 1, max: 200 })
    .withMessage('Length of name must be between 1 and 200'),
  body('phone')
    .notEmpty()
    .withMessage('this field is required')
    .isNumeric({ no_symbols: true })
    .withMessage('Invalid phone number'),
  body('email')
    .isEmail()
    .withMessage('invalid email address'),
  body('workingFields')
    .notEmpty()
    .withMessage('this field is required')
    .isLength({ min: 1, max: 200 })
    .withMessage('Length of name must be between 1 and 200'),
  body('description')
    .notEmpty()
    .withMessage('this field is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Length of name must be between 10 and 500'),
  body('address')
    .notEmpty()
    .withMessage('this field is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Length of name must be between 10 and 500'),
];
