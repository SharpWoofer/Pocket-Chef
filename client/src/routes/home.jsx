import { Box, Button, Container, Unstable_Grid2 as Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSearchRecipesQuery } from "../store/apis/recipe";
import cooking from "../assets/cooking.png";

const Home = () => {
    const { data, isLoading } = useSearchRecipesQuery({
        query: "burger",
        number: 6
    });
    const recipes = data?.results ?? [];

    console.log(recipes)

    return (
        //Landing Page
        <Container maxWidth="lg" sx={{
            paddingY: 6
        }}>
            <Stack direction="row" alignItems="center" gap={12} paddingY={10}>
                <Box width="60%">
                    <Stack gap={2}>
                        <Typography variant="h2" sx={{
                            fontSize: "3rem",
                        }}>
                            Cooking Made Fun and Easy: Unleash Your Inner Chef
                        </Typography>
                        <Typography variant="body1">
                            Discover new recipes, learn new cooking techniques, and explore the world of cooking. Join our community of food lovers and start cooking today!
                        </Typography>
                    </Stack>

                    <Link to="/recipes">
                        <Button variant="contained" color="primary" size="large" sx={{
                            marginTop: "2rem"
                        }}>
                            Get Started
                        </Button>
                    </Link>
                </Box>
                <Box>
                    <img src={cooking} alt="cooking" style={{
                        width: "100%",
                        height: "auto",
                    }} />
                </Box>
            </Stack>

            {/* Recipe Deck */}
            <Box>
                <Typography variant="h2" sx={{
                    fontSize: "2rem",
                }}>
                    Popular Recipes
                </Typography>
                <Grid container marginTop={3} spacing={3} justifyContent="center">
                    {recipes.map((recipe) => (
                        <Grid xs={4} key={recipe.id}>
                            <Link to={`/recipes/${recipe.id}`} style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}>
                                <img src={recipe.image} alt={recipe.title} style={{
                                    width: "100%",
                                    aspectRatio: "4/3",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                }} />
                                <Typography variant="body1" sx={{
                                    fontWeight: "700",
                                }}>
                                    {recipe.title}
                                </Typography>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Home;
