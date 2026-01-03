const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'company_profile_pdf') {
      cb(null, 'uploads/');
    } else if (file.fieldname === 'user_profile_pdf') {
      cb(null, 'uploads/');
    }
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

// Accept PDF, JPG, PNG
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, JPG, and PNG files are allowed'), false);
  }
};

module.exports = multer({ storage, fileFilter });
