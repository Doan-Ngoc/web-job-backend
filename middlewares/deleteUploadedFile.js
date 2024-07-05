const fs = require('fs');
// Middleware to delete uploaded files
const deleteUploadedFiles = (req, res, next) => {
  // Check if files are uploaded and available in request object
  const files = req.files;
  Object.keys(files).forEach(fieldname => {
  const file = files[fieldname][0]; 
  try {
    fs.unlinkSync(file.path);
    console.log(`Deleted file: ${file.path}`);
  } catch (error) {
    console.error(`Error deleting file: ${file.path}`, error);
    // Handle error as needed
  }
})
  // if (req.file) {
  //   deleteUploadedFile(req.file.path);
  // } else if (req.files) {
  //   req.files.forEach(file => deleteUploadedFile(file.path));
  // }

  // Proceed to the next middleware/controller
  // next();
};

module.exports = deleteUploadedFiles;
