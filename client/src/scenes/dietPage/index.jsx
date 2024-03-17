import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import './DietPage.css';
import axios from 'axios';

const DietPage = () => {
    const [recipes, setRecipes] = useState([]);

    // Remove the searchRecipes function and related code

    return (
        <Box>
            <Typography variant="h4">Diet Page</Typography>
            <Box>
                {recipes.map(recipe => (
                    <Typography key={recipe.id}>{recipe.title}</Typography>
                ))}
            </Box>
        </Box>
    );
};

export default DietPage;