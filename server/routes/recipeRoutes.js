import express from "express";
import recipeController from "../controllers/recipeController.js"; // Import the controller object

const recipeRoutes = express.Router();

recipeRoutes.get('/search', recipeController.searchRecipe);
recipeRoutes.get('/:id', recipeController.getRecipeById);

export default recipeRoutes;