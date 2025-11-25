import express from "express";
import multer from "multer";
import AWS from "aws-sdk";
import auth from "../middleware/auth.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

// Multer config (memory storage for direct upload to S3)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload file to S3
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${Date.now()}_${req.file.originalname}`,
      Body: req.file.buffer,
      ACL: "public-read"
    };

    const data = await s3.upload(params).promise();
    res.json({ message: "File uploaded successfully", url: data.Location });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed", error });
  }
});

// List files in S3 bucket
router.get("/files", auth, async (req, res) => {
  try {
    const params = { Bucket: process.env.AWS_BUCKET_NAME };
    const data = await s3.listObjectsV2(params).promise();
    const files = data.Contents.map(file => ({
      name: file.Key,
      url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`
    }));
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch files", error });
  }
});

export default router;
