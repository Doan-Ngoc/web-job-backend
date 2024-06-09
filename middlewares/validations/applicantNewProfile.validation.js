const { body } = require('express-validator');

module.exports = [
  body('name')
    .notEmpty()
    .withMessage('this field is required'),
  body('phone')
    .notEmpty()
    .withMessage('this field is required')
    .isNumeric({ no_symbols: true })
    .withMessage('Invalid phone number'),
  body('workingFields')
    .notEmpty()
    .withMessage('this field is required')
    .isArray(),
  body('description')
    .notEmpty()
    .withMessage('this field is required')
];
