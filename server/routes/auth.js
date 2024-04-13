import express from "express";
import {addUserWeight, getUserWeightList, login, register, setUserInfo} from "../controllers/auth.js";
import multer from "multer";
import {verifyToken} from "../middleware/auth.js";

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
// authRouter.post("/register", upload.single('picture'), register);
authRouter.post("/register", register);

authRouter.post("/addUserWeight", verifyToken, addUserWeight);
authRouter.post("/setUserInfo", verifyToken, setUserInfo);
authRouter.get("/getUserWeightList", verifyToken, getUserWeightList);
export default authRouter;
