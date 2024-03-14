import NavBar from "../navBar";
import axios from 'axios';
import { useState, useEffect } from 'react';

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState(null);
    const recipeId = '715538'; // Replace with the actual recipe ID

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/search/${recipeId}`);
                console.log(response.data);
                setRecipe(response.data); // Assuming your backend returns recipe data in JSON format
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [recipeId]);

    return (
        <div>
            {recipe ? (
                <div>
                    <h2>{recipe.title}</h2>
                    <p>Ready in: {recipe.readyInMinutes} minutes</p>
                    <p>Servings: {recipe.servings}</p>
                    <h3>Ingredients:</h3>
                    <ul>
                        {recipe.extendedIngredients.map(ingredient => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                    <h3>Instructions:</h3>
                    <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
                </div>
            ) : (
                <p>Loading recipe...</p>
            )}
        </div>
    );
};

export default RecipeDetails;
