const { body } = require('express-validator');

module.exports = [
  body('name')
    .notEmpty()
    .withMessage('This field is required'),
  body('phone')
    .notEmpty()
    .withMessage('This field is required')
    .isNumeric({ no_symbols: true })
    .withMessage('Invalid phone number'),
    body('email')
    .notEmpty()
    .withMessage('This field is required')
    .isEmail()
    .withMessage('Invalid email address'),
  body('workingFields')
    .notEmpty()
    .withMessage('This field is required')
    .isArray(),
  body('description')
    .notEmpty()
    .withMessage('This field is required')
];
