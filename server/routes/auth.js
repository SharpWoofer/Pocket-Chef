import express from "express";
import {login, register} from "../controllers/auth.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
  }
});
const upload = multer({storage: storage}); 

const authRouter = express.Router();
authRouter.post("/login", login);
//authRouter.post("/register", upload.single('picture'), register);
authRouter.post("/register", register);
export default authRouter;
