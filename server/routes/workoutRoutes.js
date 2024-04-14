import express from "express";
import { searchExercises } from "../controllers/workoutController.js";

const workoutRouter = express.Router();

workoutRouter.get("/search", searchExercises);

export default workoutRouter;

