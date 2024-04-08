import express from 'express';
import {addFavoriteRecipe, getFavoriteRecipes, removeFavoriteRecipe} from '../controllers/recipeFavoriteController.js';

const router = express.Router();

// Add a favorite recipe
router.post('/', addFavoriteRecipe);

// Remove a favorite recipe
router.delete('/:recipeId', removeFavoriteRecipe);

// Get all favorite recipes for a user
router.get('/:username', getFavoriteRecipes);




export default router;
