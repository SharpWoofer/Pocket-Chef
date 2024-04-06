import { Box, Container, ImageList, ImageListItem, ImageListItemBar, InputAdornment, Stack, TextField, Typography, Grid } from "@mui/material";
import CuisineSelector from "../../components/Selector";
import { Search } from "@mui/icons-material";
import RangeSlider from "../../components/Slider"
import { useDebounce } from "@uidotdev/usehooks"
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import FavoriteRecipes from "./favoriteRecipes";
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { useSearchRecipesQuery, useAddFavoriteRecipeMutation } from "../../store/apis/recipe";


function Recipes() {
    const numRecipes = 20;
    const [query, setQuery] = useState("");
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [calories, setCalories] = useState([0, 2000]);
    const debouncedQuery = useDebounce(query, 500);
    const debouncedCalories = useDebounce(calories, 1000);
    const { data, isLoading } = useSearchRecipesQuery({
        query: debouncedQuery,
        number: numRecipes,
        cuisine: selectedCuisines.join(','),
        minCalories: debouncedCalories[0],
        maxCalories: debouncedCalories[1],
    });
    const recipes = data?.results ?? [];
    const username = useSelector(state => state.auth.user?.username);


    const cuisines = [
        'African',
        'Asian',
        'American',
        'British',
        'Cajun',
        'Caribbean',
        'Chinese',
        'Eastern European',
        'European',
        'French',
        'German',
        'Greek',
        'Indian',
        'Irish',
        'Italian',
        'Japanese',
        'Jewish',
        'Korean',
        'Latin American',
        'Mediterranean',
        'Mexican',
        'Middle Eastern',
        'Nordic',
        'Southern',
        'Spanish',
        'Thai',
        'Vietnamese',
    ];
    const handleAddToFavorites = async (event, recipeId, recipeTitle) => {
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
    
    
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [addFavoriteRecipe] = useAddFavoriteRecipeMutation();


    return (
        <Container maxWidth="lg">
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Typography variant="overline" sx={{ fontSize: '1.5rem', letterSpacing: 0.75, fontWeight: 550 }}>
                        Welcome
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <FavoriteRecipes username={username} favoriteRecipes={favoriteRecipes} setFavoriteRecipes={setFavoriteRecipes} />


                </Grid>

                <Grid item xs={12} md={6} lg={8}></Grid>

                <Grid item xs={12}>
                    <Stack direction="row" spacing={0}>
                        <Box
                            paddingX={4}
                            paddingY={2}
                            borderRadius={2}
                            sx={{ backgroundColor: "white", flexGrow: 1 }}
                        >
                            <Typography variant="body1" noWrap>
                                Start a Healthy Diet!
                            </Typography>
                            <TextField
                                type="search"
                                placeholder="Search for a recipe..."
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                                fullWidth
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </Box>

                        <Box
                            paddingX={4}
                            paddingY={2}
                            borderRadius={2}
                            sx={{ backgroundColor: "white" }}
                        >
                            <CuisineSelector selectedCuisines={selectedCuisines} cuisines={cuisines} onChange={setSelectedCuisines} />
                        </Box>

                        <Box
                            paddingX={4}
                            paddingY={2}
                            borderRadius={2}
                            sx={{ backgroundColor: "white" }}
                        >
                            <Typography variant="body1" noWrap>
                                Calorie Range:
                            </Typography>
                            < RangeSlider calories={calories} onChange={setCalories} />
                        </Box>
                    </Stack>
                </Grid>


                {isLoading ? (
                    <Box width={1} >
                        <Typography variant="h6" align="center">
                            Loading recipes...
                        </Typography>
                    </Box>
                ) :
                    recipes.length ?
                        (
                            <Box width={1} sx={{ overflow: 'hidden', py: 2 }}>
                                <ImageList variant="masonry" cols={4} gap={16}>
                                    {recipes.map(({ id, title, image }) => (
                                        <Link to={`/recipes/${id}`} style={{ textDecoration: 'none' }}>
                                            <ImageListItem key={id} sx={{
                                                borderRadius: 2,
                                                overflow: 'hidden',
                                                position: 'relative',
                                                boxShadow: 1,
                                                transition: 'transform 0.3s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                    "& .image-title-overlay": {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                                                    }
                                                }
                                            }}>
                                                <img
                                                    src={`${image}?w=248&fit=crop&auto=format`}
                                                    srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                    alt={title}
                                                    loading="lazy"
                                                    style={{ width: '100%', height: '100%', display: 'block' }}
                                                />
                                                <Box className="image-title-overlay" sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                                    color: 'white',
                                                    textAlign: 'center',
                                                    p: 1
                                                }}>
                                                    {title}
                                                </Box>
                                                <IconButton
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 8,
                                                        right: 8,
                                                        backgroundColor: 'white',
                                                        '&:hover': { backgroundColor: '#f4f4f4' }
                                                    }}
                                                    onClick={(event) => handleAddToFavorites(event, id, title)}
                                                    aria-label={`add to favorites ${title}`}
                                                >
                                                    <FavoriteBorder />
                                                </IconButton>
                                            </ImageListItem>
                                        </Link>
                                    ))}
                                </ImageList>
                            </Box>
                        ) :
                        <Box width={1}>
                            <Typography variant="h6" align="center">
                                No recipes found :(
                            </Typography>
                        </Box>
                }
            </Grid>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={() => setSnackbarOpen(false)}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />

        </Container >
        
    )
}

export default Recipes;