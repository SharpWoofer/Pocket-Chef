import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSearchRecipesQuery } from "../store/apis/recipe";
import cooking from "../assets/cooking.png";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const Home = () => {
    const { data } = useSearchRecipesQuery({
        query: "chinese",
        number: 6,
        cuisine: '',
        minCalories: 0,
        maxCalories: 5000,
    });
    const recipes = data?.results ?? [];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Hero Section */}
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: { xs: "2.5rem", md: "3rem" },
                            fontWeight: "bold",
                            mb: 2,
                        }}
                    >
                        Unleash Your Inner Chef
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "1rem", md: "1.25rem" },
                            fontWeight: 400,
                            color: "#555",
                            mb: 4,
                        }}
                    >
                        Discover, cook, and share the best recipes.
                    </Typography>
                    <Link to="/recipes">
                        <Button variant="contained" color="primary" size="large">
                            Get Started
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={cooking} alt="cooking" style={{ width: "100%", height: "auto", borderRadius: '8px' }} />
                    </Box>
                </Grid>
            </Grid>

            {/* Popular Recipes Section */}
            <Box sx={{ mt: 6 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Popular Recipes
                </Typography>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={'auto'}
                    freeMode={true}
                    grabCursor={true}
                >
                    {recipes.map((recipe) => (
                        <SwiperSlide key={recipe.id} style={{ width: 'auto', maxWidth: '250px' }}>
                            <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        aspectRatio: "4/3",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                        mb: 1
                                    }}
                                />
                                <Typography
                                    variant="body1"
                                    sx={{ fontWeight: 600, textAlign: "center" }}
                                >
                                    {recipe.title}
                                </Typography>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Container>
    );
};

export default Home;
