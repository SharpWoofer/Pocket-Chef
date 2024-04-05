import { Router } from "express";
import path from "path";
import multer from "multer";
import { UploadController } from "../controllers/common.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    const mFilename = Date.now() + path.extname(file.originalname)
    cb(null, mFilename);
  }
});
const upload = multer({storage: storage}); 


const CommonRouter = Router()

CommonRouter.post('/upload', upload.single('file'), UploadController)

export default CommonRouter
