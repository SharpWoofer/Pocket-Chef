import express from "express";
import recipeController from "../controllers/recipeController.js"; // Import the controller object

const recipeRoutes = express.Router();
recipeRoutes.get('/search/:query', recipeController.searchRecipe);
//recipeRoutes.get('/searchRecipe', recipeController.searchRecipe);
export default recipeRoutes;
