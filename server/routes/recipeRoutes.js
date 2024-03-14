import express from "express";
const recipeRoutes = express.Router();
import recipeController from "../controllers/recipeController.js"; // Import the controller object

recipeRoutes.get('/search', recipeController.getRecipeById); // Use the getRecipeById function from the controller
export default recipeRoutes;
