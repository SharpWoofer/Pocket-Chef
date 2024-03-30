import { Box, Button, Container, Unstable_Grid2 as Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSearchRecipesQuery } from "../store/apis/recipe";
import cooking from "../assets/cooking.png";
import CalorieTracker from "./calorietracker/calorieTracker";
import { useState } from "react";

const Home = () => {
    const { data, isLoading } = useSearchRecipesQuery({
        query: "chinese",
        number: 6
    });
    const recipes = data?.results ?? [];

    console.log(recipes)
    const [results, setResults] =useState([])

    return (
        //Landing Page
        <Container maxWidth="100vh" sx={{
            paddingY: 1
        }}>
            <Stack direction="row" alignItems="center" justifyContent="space-around"  gap={12} paddingY={3}>
                <Box width="50%" >
                    <Stack gap={2}>
                        <Typography variant="h2" sx={{
                            fontSize: "4.2rem",
                            fontWeight: "bold"
                        }}>
                            Cooking Made Fun and Easy: Unleash Your Inner Chef
                        </Typography>
                        <Typography variant="body1" sx={{
                            fontSize: "1.1rem",
                            fontWeight: "400",
                            color:"#555555",

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
                <Box>
                    <img src={cooking} alt="cooking" style={{
                        width: "100%",
                        height: "100%",
                    }} />
                </Box>
            </Stack>
            {/* Calorie Tracker*/}
            <Stack alignItems="center" gap={12} paddingY={10}>
                <CalorieTracker setResults={setResults} />
            </Stack>

            {/* Recipe Deck */}
            <Box>
                <Typography varient="h3" sx={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    color: "#FF6868"

                }}>
                    SPECIAL DISHES
                </Typography>
                <Typography variant="h2" sx={{
                    textAlign: "center",
                    fontSize: "3rem",
                    fontWeight: "bold"
                }}>
                    Standout Dishes From Our Menu
                </Typography>

                <Grid container marginTop={3} spacing={3} justifyContent="space-between" overflow="hidden">
                    {recipes.map((recipe) => (
                        <Grid xs={2} key={recipe.id}>
                            <Link to={`/recipes/${recipe.id}`} style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}>
                                <Box sx={{
                                    width: "16rem",
                                    height: "15rem",
                                    backgroundColor: "#ede9dd",
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                    boxShadow:"-5px 12px 20px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3)"
                                }}>
                                    <Stack>
                                        <img src={recipe.image} alt={recipe.title} style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }} />
                                    </Stack>
                                    <Stack>
                                        <Typography variant="body1" sx={{
                                            fontSize: "0.9rem",
                                            fontWeight: "700",
                                        }}>
                                            {recipe.title}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Home;
