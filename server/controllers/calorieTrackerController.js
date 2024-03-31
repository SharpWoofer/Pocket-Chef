import axios from 'axios';
import calorieCount from '../Models/calorieCount.js';
const apiKey = '1c759ff2ee864d2bb3388274a18e92bd';

export const searchIngredient = async (req, res) => {
    const { query } = req.body;
    try { 
        const response = await axios.get(`https://api.spoonacular.com/food/ingredients/search?query=${query}&apiKey=${apiKey}`);
        const results = response.data.results.map(ingredient => ({
            id: ingredient.id,
            name: ingredient.name
        })); // returns only id and name
        res.json(results); // Sending the results back to the frontend
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
};

export const getIngredientById = async (req, res) => {
    const { id, number } = req.body;
    try {
        const response = await axios.get(`https://api.spoonacular.com/food/ingredients/${id}/information?amount=${number}&apiKey=${apiKey}`);
        const calories = response.data.nutrition.nutrients.find(nutrient => nutrient.name === "Calories");
        if (calories) {
            res.json(calories.amount);
        } else {
            res.json('Calories not found for this ingredient');
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getCalCount = async (req, res) => {
    const { username, date } = req.body;
    try {
        const cal = await calorieCount.findOne({ username, date });
        if (cal) {
            res.status(200).json(cal);
        } else {
            res.status(404).json({ error: "Calorie count not found for the given date and username" });
        }
    } catch (error) {
        console.error("Error fetching calorie count:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createCalCount = async (req, res) => {
    const { date, username, breakfastCal, lunchCal, dinnerCal} = req.body;
    try {
        const newCalCount = new calorieCount({
            date,
            username,
            breakfastCal,
            lunchCal,
            dinnerCal
        });
        await newCalCount.save();
        res.status(201).json({ message: "Calorie count created successfully", calorieCount: newCalCount});
    } catch (error) {
        console.error("Error creating calorie count:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const updateCalCount = async (req, res) => {
    const { date, username, breakfastCal, lunchCal, dinnerCal} = req.body;
    try {
        const existingCalCount = await calorieCount.findOne({ date, username });

        if (!existingCalCount) {
            return res.status(404).json({ error: "Calorie count entry not found for the given date and username" });
        }
        existingCalCount.breakfastCal += breakfastCal;
        existingCalCount.lunchCal += lunchCal;
        existingCalCount.dinnerCal += dinnerCal;

        await existingCalCount.save();

        res.status(200).json({ message: "Calorie count updated successfully", calorieCount: existingCalCount });
    } catch (error) {
        console.error("Error updating calorie count:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default { searchIngredient, getIngredientById, getCalCount, createCalCount, updateCalCount };

