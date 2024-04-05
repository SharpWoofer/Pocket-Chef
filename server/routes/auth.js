import express from "express";
import {addUserWeight, getUserWeightList, login, register, setUserInfo} from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const authRouter = express.Router();
authRouter.post("/login", login);

authRouter.post("/register", register);

authRouter.post("/setUserInfo", verifyToken, setUserInfo);

authRouter.post("/addUserWeight", verifyToken, addUserWeight);
authRouter.get("/getUserWeightList", verifyToken, getUserWeightList);
export default authRouter;
