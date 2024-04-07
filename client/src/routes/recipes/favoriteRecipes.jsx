

import { Link } from "react-router-dom";
import { Container, Typography, ImageList, ImageListItem, ImageListItemBar, Grid } from "@mui/material";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FavoriteRecipes({ favoriteRecipes }) {
    const [favoriteRecipesDetails, setFavoriteRecipesDetails] = useState([]);

    const fetchRecipeDetails = async (favoriteRecipes) => {
        const detailsPromises = favoriteRecipes.map(recipeId =>
            axios.get(`http://localhost:5001/recipes/${recipeId}`)
        );
        const detailsResponses = await Promise.all(detailsPromises);
        const details = detailsResponses.map(response => response.data);
        return details;
    };


    useEffect(() => {
        fetchRecipeDetails(favoriteRecipes).then(details => setFavoriteRecipesDetails(details)).catch(error => console.error("Error fetching favorite recipes"))
    }, [favoriteRecipes])

    return (
        <Container maxWidth="lg">
            <ImageList variant="masonry" gap={16} rowHeight={200} sx={{ paddingY: 2 }}>
                {favoriteRecipesDetails.map((recipe) => (
                    <ImageListItem key={recipe.id} sx={{ height: 'auto' }}> {/* Ensure consistent height */}
                        <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', position: 'relative' }}>
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                loading="lazy"
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                            <ImageListItemBar title={recipe.title} position="below" />
                        </Link>
                    </ImageListItem>
                ))}
            </ImageList>
        </Container>
    );
}

export default FavoriteRecipes;
