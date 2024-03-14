import axios from 'axios';
const apiKey = 'e5735f1495384efd839f2f84d9531754';

const searchRecipe = async (req, res) => {
    const {query} = req.params;
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getRecipeDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
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




export default {searchRecipe, getRecipeDetails, getRandomRecipes, getRecipeById};