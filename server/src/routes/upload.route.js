import express from "express";
import upload from "../utils/multer.js";
const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  res.json({
    message: "File uploaded successfully",
    filename: req.file.filename,
    path: req.file.path,
    mimetype: req.file.mimetype,
  });
});

export default router;
