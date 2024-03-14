import express from "express";
import recipeController from "../controllers/recipeController.js"; // Import the controller object

const recipeRoutes = express.Router();
recipeRoutes.get('/searchRecipe', recipeController.searchRecipe);
export default recipeRoutes;
