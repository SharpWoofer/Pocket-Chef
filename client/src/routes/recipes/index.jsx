import { Box, Container, ImageList, ImageListItem, ImageListItemBar, InputAdornment, Stack, TextField, Typography, Grid } from "@mui/material";
import CuisineSelector from "../../components/Selector";
import { Search } from "@mui/icons-material";
import RangeSlider from "../../components/Slider"
import { useDebounce } from "@uidotdev/usehooks"
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchRecipesQuery } from "../../store/apis/recipe";
import FavoriteRecipes from "./favoriteRecipes";
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';



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
    const userId = 'user-id-placeholder';

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
    const handleAddToFavorites = (event, recipeId, recipeTitle) => {
        event.stopPropagation(); 
        console.log(`Adding recipe ${recipeId}: ${recipeTitle} to favorites.`);
        
        // Function to be added.
        setSnackbarMessage(`Added "${recipeTitle}" to favorites.`);
        setSnackbarOpen(true);
    };
    
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    const addFavoriteRecipe = async (userId, recipeName) => {
  try {
    //user model?
    //const user = await User.findById(userId);
    
    if (user) {
      // Add the recipe name to the favorites array TBC
      if (!user.favoriteRecipes.includes(recipeName)) {
        user.favoriteRecipes.push(recipeName);
        await user.save();
        return { status: 'success', message: 'Recipe added to favorites.' };
      } else {
        return { status: 'info', message: 'Recipe is already in favorites.' };
      }
    } else {
      return { status: 'error', message: 'User not found.' };
    }
  } catch (error) {
    console.error('Error adding favorite recipe:', error);
    return { status: 'error', message: 'Error updating favorites.' };
  }
};



    

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Typography variant="overline" sx={{ fontSize: '1.5rem', letterSpacing: 0.75, fontWeight: 550 }}>
                        Welcome
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <FavoriteRecipes userId={userId} />
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
                            <Box width={1}>
                                <ImageList
                            variant="masonry"
                            cols={4}
                            gap={16}
                            rowHeight={200}
                            sx={{
                                paddingY: 2
                            }}
                            >
                                {recipes.map(({ id, title, image }) => (
                                    <ImageListItem key={id}>
                                        <img
                                            src={image}
                                            alt={title}
                                            loading="lazy"
                                        />
                                        <Link to={`/recipes/${id}`} style={{ textDecoration: 'none' }}>
                                            <ImageListItemBar title={title} />
                                        </Link>
                                        <IconButton
                                            sx={{ position: 'absolute', top: 0, right: 0 }}
                                            onClick={(event) => handleAddToFavorites(event, id, title)} // Pass title here
                                            aria-label={`add to favorites ${title}`}
                                        >
                                            <FavoriteBorder />
                                        </IconButton>

                                    </ImageListItem>
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