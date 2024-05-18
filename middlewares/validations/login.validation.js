const { body } = require('express-validator');
const constants = require('../../constants');

module.exports = [
  body('email')
    .notEmpty()
    .withMessage('Please enter your email')
    .isEmail()
    .withMessage(),
  body('password')
    .notEmpty()
    .withMessage('Please enter your password'),
];
