

import { Link } from "react-router-dom";
import { Box, Container, Typography, ImageList, ImageListItem, ImageListItemBar, Grid, IconButton, Snackbar } from "@mui/material";
import { useGetFavoriteRecipesQuery } from '../../store/apis/recipe';
import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function FavoriteRecipes({ username, addFavoriteRecipe }) {
    const { data: favoriteRecipesData, isLoading, isError } = useGetFavoriteRecipesQuery(username, { skip: !username });
    const [favoriteRecipesDetails, setFavoriteRecipesDetails] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const fetchRecipeDetails = async (favoriteRecipes) => {
        try {
            const detailsPromises = favoriteRecipes.map(recipeId =>
                axios.get(`http://localhost:5000/recipes/${recipeId}`)
            );
            const detailsResponses = await Promise.all(detailsPromises);
            const details = detailsResponses.map(response => response.data);
            setFavoriteRecipesDetails(details);
        } catch (error) {
            console.error('Error fetching favorite recipe details:', error);
        }
    };

    useEffect(() => {
        if (favoriteRecipesData?.favoriteRecipes.length > 0) {
            fetchRecipeDetails(favoriteRecipesData.favoriteRecipes);
        }
    }, [favoriteRecipesData?.favoriteRecipes]);

    const handleAddToFavorites = async (event, recipeId, recipeTitle) => {
        event.preventDefault();
        event.stopPropagation(); // Stop event propagation to prevent navigating to the recipe link
        console.log('Recipe ID:', recipeId);
    console.log('Recipe Title:', recipeTitle);
    console.log('Username:', username);
        try {
            await addFavoriteRecipe({ username, recipeId }).unwrap();
            setSnackbarMessage(`Added "${recipeTitle}" to favorites.`);
            setFavoriteRecipes((prevFavorites) => [...prevFavorites, { id: recipeId, title: recipeTitle }]);
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error adding to favorites:', error);
            setSnackbarMessage(`Failed to add "${recipeTitle}" to favorites.`);
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    if (isLoading) {
        return (
            <Container maxWidth="lg">
                <Box width={1}>
                    <Typography variant="h6" align="center">
                        Loading your favorite recipes...
                    </Typography>
                </Box>
            </Container>
        );
    }

    if (isError) {
        return (
            <Container maxWidth="lg">
                <Box width={1}>
                    <Typography variant="h6" align="center">
                        Error loading your favorite recipes.
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {favoriteRecipesDetails.length ? (
                        <ImageList variant="masonry" cols={4} gap={16} rowHeight={200} sx={{ paddingY: 2 }}>
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
                                    <IconButton
                                        sx={{ position: 'absolute', top: 0, right: 0 }}
                                        onClick={(event) => handleAddToFavorites(event, recipe.id, recipe.title)}
                                        aria-label={`add to favorites ${recipe.title}`}
                                    >
                                        <FavoriteBorderIcon fontSize="large" />
                                    </IconButton>
                                </ImageListItem>
                            ))}
                        </ImageList>
                    ) : (
                        <Box width={1}>
                            <Typography variant="h6" align="center">
                                No favorite recipes found.
                            </Typography>
                        </Box>
                    )}
                </Grid>
            </Grid>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleCloseSnackbar}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </Container>
    );
}

export default FavoriteRecipes;
