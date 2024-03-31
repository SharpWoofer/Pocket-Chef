import express from 'express';
const router = express.Router();

import { addFavoriteRecipe, removeFavoriteRecipe, getFavoriteRecipes } from '../controllers/recipeFavoriteController.js';

// Add a favorite recipe
router.post('/', addFavoriteRecipe);

// Remove a favorite recipe
router.delete('/:recipeId', removeFavoriteRecipe);

// Get all favorite recipes for a user
router.get('/:username', getFavoriteRecipes);




export default router;
