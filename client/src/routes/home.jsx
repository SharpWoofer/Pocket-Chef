import { Box, Button, Container, Unstable_Grid2 as Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSearchRecipesQuery } from "../store/apis/recipe";
import cooking from "../assets/cooking.png";
import CalorieTracker from "./calorietracker/calorieTracker";
import { useState } from "react";
import Workout from "./workout/workout.jsx";

const Home = () => {
    const { data, isLoading } = useSearchRecipesQuery({
        query: "chinese",
        number: 6,
        cuisine: '',
        minCalories: 0,
        maxCalories: 5000,
    });
    const recipes = data?.results ?? [];
    return (
        //Landing Page
        <Container maxWidth="1900px" sx={{
            paddingY: 1
        }}>
            <Stack direction="row" alignItems="center" justifyContent="space-around" gap={12} paddingY={3}>
                <Box width="60%" >
                    <Stack gap={2}>
                        <Typography variant="h2" sx={{
                            fontSize: "4.3rem",
                            fontWeight: "bold"
                        }}>
                            Cooking Made Fun and Easy: Unleash Your Inner Chef
                        </Typography>
                        <Typography variant="body1" sx={{
                            fontSize: "1.2rem",
                            fontWeight: "400",
                            color: "#555555",

                        }}>
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
                <Box width="40%">
                    <img src={cooking} alt="cooking" style={{
                        width: "100%",
                        height: "100%",
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
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
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
