import { Box, Container, ImageList, ImageListItem, ImageListItemBar, InputAdornment, Stack, TextField, Typography, Grid } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDebounce } from "@uidotdev/usehooks"
import { useState} from "react";
import { Link } from "react-router-dom";
import { useSearchRecipesQuery } from "../../store/apis/recipe";
import FavoriteRecipes from "./favoriteRecipes";

function Recipes() {
    const numRecipes = 20;
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);
    const { data, isLoading } = useSearchRecipesQuery({
        query: debouncedQuery,
        number: numRecipes,
    });
    const recipes = data?.results ?? [];
    const userId = 'user-id-placeholder';

    

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="overline">
                        Welcome
                    </Typography>
                </Grid>
                
                <Grid item xs={12} md={6} lg={4}>
                    <FavoriteRecipes userId={userId} />
                </Grid>
                
                <Grid item xs={12} md={6} lg={8}></Grid>

                <Grid item xs={12}>
                    <Box
                        paddingX={4}
                        paddingY={2}
                        borderRadius={2}
                        sx={{ backgroundColor: "white" }}
                    >
                        <Typography variant="body1" noWrap>
                            Start a Healthy Diet
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
                </Grid>


                {isLoading ? (
                    <Typography variant="body1" align="center">
                        Loading recipes...
                    </Typography>
                ) :
                    recipes.length ?
                        (
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
                                    <Link to={`/recipes/${id}`} key={id}>
                                        <ImageListItem >
                                            <img
                                                src={image}
                                                alt={`${title}`}
                                                loading="lazy" />
                                            <ImageListItemBar
                                                title={title}
                                            />
                                        </ImageListItem>
                                    </Link>
                                ))}
                            </ImageList>
                        ) :
                        <Typography variant="body1" align="center">
                            No recipes found :(
                        </Typography>

                }
            </Grid>
        </Container >
    )
}

export default Recipes;