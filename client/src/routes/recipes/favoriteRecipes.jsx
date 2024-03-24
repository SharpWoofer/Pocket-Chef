import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Stack } from "@mui/material";

function FavoriteRecipes({ userId }) {
    const [favorites, setFavorites] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchFavorites = async () => {
        setIsLoading(true);
        try {
            //change with user database
            const favoriteRecipesFromDB = []; 
            setFavorites(favoriteRecipesFromDB);
        } catch (error) {
            console.error("There was an error fetching the favorite recipes", error);
            setFavorites([]); 
        }
        setIsLoading(false);
    };
    
    useEffect(() => {
        if (userId) {
            fetchFavorites();
        }
    }, [userId]);
    
    // Define the content to show based on the loading state and the data
    let content;
    const displayedFavorites = showAll ? favorites : favorites.slice(0, 5);

    if (isLoading) {
        content = <Typography>Loading your favorite recipes...</Typography>;
    } else if (favorites.length === 0) {
        content = <Typography>You have no favorite recipes yet.</Typography>;
    } else {
        const recipesToShow = showAll ? favorites : favorites.slice(0, 5);
        content = (
            <Stack direction="column" gap={2}>
                {recipesToShow.map(recipe => (
                    <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                        <Typography variant="body1">{recipe.title}</Typography>
                    </Link>
                ))}
                {favorites.length > 5 && (
                    <Button onClick={() => setShowAll(!showAll)}>
                        {showAll ? 'See Less' : 'See All'}
                    </Button>
                )}
            </Stack>
        );
    }

    return (
        <Container>
            <Typography variant="h6" gutterBottom>
                Your Favorite Recipes
            </Typography>
            <Stack direction="column" gap={2}>
                {displayedFavorites.map(recipe => (
                    //each recipe should have an id and a title
                    <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                        <Typography variant="body1">{recipe.title}</Typography>
                    </Link>
                ))}
                {isLoading && <Typography>Loading...</Typography>}
                {!isLoading && favorites.length === 0 && (
                    <Typography>You have no favorite recipes yet.</Typography>
                )}
            </Stack>
            {!isLoading && favorites.length > 0 && (
                <Button onClick={() => setShowAll(!showAll)}>
                    {showAll ? 'Show Less' : 'Show All'}
                </Button>
            )}
        </Container>
    );
}

export default FavoriteRecipes;
