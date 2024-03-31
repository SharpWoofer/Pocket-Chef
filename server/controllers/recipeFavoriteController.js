import User from '../Models/user.js';

// Adds a recipe to the user's favorites
export const addFavoriteRecipe = async (req, res) => {
    const { username, recipeId } = req.body;

    try {
        const user = await User.findOneAndUpdate({ username }, { $addToSet: { favoriteRecipes: recipeId } }, { new: true });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Recipe added to favorites successfully", user });
    } catch (error) {
        console.error("Error adding recipe to favorites:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// Removes a recipe from the user's favorites
export const removeFavoriteRecipe = async (req, res) => {
    const { username, recipeId } = req.body;

    try {
        const user = await User.findOneAndUpdate({ username }, { $pull: { favoriteRecipes: recipeId } }, { new: true });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Recipe removed from favorites successfully", user });
    } catch (error) {
        console.error("Error removing recipe from favorites:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// Gets the user's favorite recipes
export const getFavoriteRecipes = async (req, res) => {
    const { username } = req.params; // Adjusted to use username in the URL parameter

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ favoriteRecipes: user.favoriteRecipes });
    } catch (error) {
        console.error("Error fetching favorite recipes:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export default { addFavoriteRecipe, removeFavoriteRecipe, getFavoriteRecipes, };
