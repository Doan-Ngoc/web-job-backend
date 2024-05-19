const { body } = require('express-validator');
const constants = require('../../constants');

module.exports = [
  body('email')
    .notEmpty()
    .withMessage('Please enter your email')
    .isEmail()
    .withMessage('Invaild email address'),
  body('password')
    .notEmpty()
    .withMessage('Please enter your password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('role')
    .notEmpty()
    .withMessage('Please select your role')
    .isIn(constants.roles)
    .withMessage('invalid role'),
];
