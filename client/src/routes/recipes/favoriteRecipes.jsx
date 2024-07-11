import {Link} from "react-router-dom";
import {Container, ImageList, ImageListItem} from "@mui/material";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

function FavoriteRecipes({favoriteRecipes}) {
    const [favoriteRecipesDetails, setFavoriteRecipesDetails] = useState([]);

    const fetchRecipeDetails = async (favoriteRecipes) => {
        const detailsPromises = favoriteRecipes.map(recipeId =>
            axios.get(`https://pocket-chef-sigma.vercel.app/recipes/${recipeId}`)
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
            <ImageList variant="masonry" gap={16} rowHeight={200} sx={{paddingY: 2}}>
                {favoriteRecipesDetails.map((recipe) => (
                    <Box key={recipe.id} position="relative">
                        <Link to={`/recipes/${recipe.id}`} style={{textDecoration: 'none'}}>
                            <ImageListItem sx={{
                                borderRadius: 2,
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: 1,
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    "& .image-title-overlay": {
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)' // Darken overlay on hover for visibility
                                    }
                                }
                            }}>
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    loading="lazy"
                                    style={{width: '100%', height: '100%', display: 'block'}}
                                />
                                <Box className="image-title-overlay" sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Light background for the overlay for better text visibility
                                    color: 'white',
                                    textAlign: 'center',
                                    p: 1
                                }}>
                                    {recipe.title}
                                </Box>
                            </ImageListItem>
                        </Link>
                        <IconButton
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                backgroundColor: 'white',
                                '&:hover': {backgroundColor: '#f4f4f4'}
                            }}
                            onClick={(event) => handleToggleFavorite(event, recipe.id, recipe.title)}
                            aria-label={`add to favorites ${recipe.title}`}
                        >
                            <FavoriteBorder/>
                        </IconButton>
                    </Box>

                ))}
            </ImageList>
        </Container>
    );
}

export default FavoriteRecipes;
