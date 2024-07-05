const { validationResult } = require("express-validator");
const deleteUploadedFiles = require("./deleteUploadedFile")

// sequential processing, stops running validations chain if the previous one fails.
const validate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('error', errors)
    deleteUploadedFiles(req)
    const returnErrors = errors
      .array()
      .map(({ msg, path }) => ({ msg, path }));
    return res.status(400).json({ errors: returnErrors });
  }
  return next();
};

module.exports = validate;
