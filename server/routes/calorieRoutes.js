import express from "express";
import ingredientController from "../controllers/calorieTrackerController.js";
import { searchIngredient, getIngredientById, getCalCount, createCalCount, updateCalCount } from "../controllers/calorieTrackerController.js";

const calorieTrackerRouter = express.Router();

calorieTrackerRouter.post("/", searchIngredient);
calorieTrackerRouter.post("/calories", getIngredientById);
calorieTrackerRouter.post("/getcal", getCalCount);
calorieTrackerRouter.post("/createcal", createCalCount);
calorieTrackerRouter.post("/updatecal", updateCalCount);

export default calorieTrackerRouter;