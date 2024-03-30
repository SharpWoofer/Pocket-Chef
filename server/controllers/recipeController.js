import axios from 'axios';
const apiKey = 'e5735f1495384efd839f2f84d9531754';
import Recipe from '../Models/recipeModel.js';


const searchRecipe = async (req, res) => {
    const { query } = req
    const q = query.q;
    const number = query.number ?? 10;
    const cuisine = query.cuisine ?? 'Chinese';
    const minCalories = query.minCalories ?? 0;
    
    try {
        const localRecipes = await Recipe.find({
            title: { $regex: q, $options: 'i' }
        });

        if (localRecipes.length) {
            res.status(200).json(localRecipes.slice(0, number));
        } else {
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${q}&number=${number}&apiKey=${apiKey}&cuisine=${cuisine}&minCalories=${minCalories}`);
            res.status(200).json(response.data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRecipeDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/715538/information?apiKey=${apiKey}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getRandomRecipes = async (req, res) => {
    const { number } = req.query;
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/random?number=${number}&apiKey=${apiKey}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}




export default { searchRecipe, getRecipeDetails, getRandomRecipes, getRecipeById };