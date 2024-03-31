import express from "express";
import { searchGym } from "../controllers/gymController.js";

const gymRouter = express.Router();

gymRouter.post('/search', searchGym);

export default gymRouter;