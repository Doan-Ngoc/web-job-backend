const { body } = require('express-validator');

module.exports = [
    body('title')
    .notEmpty()
    .withMessage('This field is required'),
    body('company')
    .notEmpty()
    .withMessage('This field is required'),  
    body('logo')
    .notEmpty()
    .withMessage('This field is required'),  
    body('createdAt')
    .notEmpty()
    .withMessage('This field is required'),  
    body('closedDate')
    .notEmpty()
    .withMessage('This field is required'), 
    body('createdBy')
    .notEmpty()
    .withMessage('This field is required'), 
    body('salary')
    .notEmpty()
    .withMessage('This field is required'),   
    body('location')
    .notEmpty()
    .withMessage('This field is required'),  
    body('field')
    .notEmpty()
    .withMessage('This field is required'),   
    body('position')
    .notEmpty()
    .withMessage('This field is required'),  
    body('status')
    .notEmpty()
    .withMessage('This field is required'),  
  body('description')
    .notEmpty()
    .withMessage('This field is required'),
  body('applicants')
    .isArray(),
];
