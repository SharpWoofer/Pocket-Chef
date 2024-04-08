import {
    Box,
    Container,
    Grid,
    ImageList,
    ImageListItem,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import CuisineSelector from "../../components/Selector";
import {Search} from "@mui/icons-material";
import RangeSlider from "../../components/Slider"
import {useDebounce} from "@uidotdev/usehooks"
import React, {useState} from 'react';
import {Link} from "react-router-dom";
import FavoriteRecipes from "./favoriteRecipes";
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import {useSelector} from 'react-redux';
import {useAddFavoriteRecipeMutation, useGetFavoriteRecipesQuery, useSearchRecipesQuery} from "../../store/apis/recipe";


function Recipes() {
    const numRecipes = 20;
    const [query, setQuery] = useState("");
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [calories, setCalories] = useState([0, 2000]);
    const debouncedQuery = useDebounce(query, 500);
    const debouncedCalories = useDebounce(calories, 1000);
    const username = useSelector(state => state.auth.user.username);
    const { data, isLoading } = useSearchRecipesQuery({
        query: debouncedQuery,
        number: numRecipes,
        cuisine: selectedCuisines.join(','),
        minCalories: debouncedCalories[0],
        maxCalories: debouncedCalories[1],
    });
    const { data: favoriteRecipesData } = useGetFavoriteRecipesQuery(username, { skip: !username });
    const [addFavoriteRecipe, { isError, isSuccess }] = useAddFavoriteRecipeMutation();
    const recipes = data?.results ?? [];
    const [favoriteRecipes, setFavoriteRecipes] = useState(favoriteRecipesData?.favoriteRecipes ?? []);

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
        try {
            const { user } = await addFavoriteRecipe({ username, recipeId }).unwrap();
            setSnackbarMessage(`Added "${recipeTitle}" to favorites.`);
            setFavoriteRecipes(user.favoriteRecipes ?? []);
        } catch (error) {
            console.error('Error adding to favorites:', error);
            setSnackbarMessage(`Failed to add "${recipeTitle}" to favorites.`);
        } finally {
            setSnackbarOpen(true);
        }
    };


    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");


    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="overline" sx={{ fontSize: '1.5rem', letterSpacing: 0.75, fontWeight: 550 }}>
                        Welcome
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <FavoriteRecipes favoriteRecipes={favoriteRecipes} />


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
                            <Box width={1} sx={{ py: 2 }}>
                                <ImageList variant="masonry" cols={4} gap={16} sx={{
                                    overflow: "visible"
                                }}>
                                    {recipes.map(({ id, title, image }) => (
                                        <Box key={id} position="relative">
                                            <Link to={`/recipes/${id}`} style={{ textDecoration: 'none' }}>
                                                <ImageListItem sx={{
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

                                                </ImageListItem>
                                            </Link>
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
                                        </Box>
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