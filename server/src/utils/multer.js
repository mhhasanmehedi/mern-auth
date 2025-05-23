import multer from "multer";
import path from "path";
import fs from "fs";

// Destination folder
const uploadPath = path.join("uploads");

// Ensure upload directory exists
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, { recursive: true });
// }

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});

// File filter (optional - restrict file types)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 3, // Max size 3MB
  },
});

export default upload;
