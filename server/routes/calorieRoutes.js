import express from "express";
import {
    createCalCount,
    getCalCount,
    getIngredientById,
    searchIngredient,
    updateCalCount
} from "../controllers/calorieTrackerController.js";

const calorieTrackerRouter = express.Router();

calorieTrackerRouter.post("/", searchIngredient);
calorieTrackerRouter.post("/calories", getIngredientById);
calorieTrackerRouter.post("/getcal", getCalCount);
calorieTrackerRouter.post("/createcal", createCalCount);
calorieTrackerRouter.post("/updatecal", updateCalCount);

export default calorieTrackerRouter;