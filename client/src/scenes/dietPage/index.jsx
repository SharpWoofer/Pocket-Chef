import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import './DietPage.css';

const DietPage = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    
    const searchRecipes = async () => {
        try {
            const response = await fetch(`/search/recipes/${query}`);
            const data = await response.json();
            setRecipes(data.results);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };
    
    return (
        <Box>
            <Typography variant="h4">Search for Recipes</Typography>
            <Box>
                <TextField label="Search" variant="outlined" value={query} onChange={(e) => setQuery(e.target.value)} />
                <Button variant="contained" onClick={searchRecipes}>Search</Button>
            </Box>
            <Box>
                {recipes.map(recipe => (
                    <Typography key={recipe.id}>{recipe.title}</Typography>
                ))}
            </Box>
        </Box>
    );
};

export default DietPage;
