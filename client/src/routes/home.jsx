import {Box, Button, Container, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useSearchRecipesQuery} from "../store/apis/recipe";
import cooking from "../assets/cooking.png";
import 'swiper/css';
import {Swiper, SwiperSlide} from 'swiper/react';

const Home = () => {
    const {data, isLoading} = useSearchRecipesQuery({
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
                <Box width="60%">
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

                            Unlock a universe of flavors, perfect your culinary skills, and dive into the joy of cooking
                            with our app. Connect with fellow gourmets and embrace the art of home cooking. Get started
                            now and transform the way you cook, one delightful dish at a time!
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
                    }}/>
                </Box>
            </Stack>

            {/* Recipe Deck */}
            <Box>
                <Typography variant="h2" sx={{fontSize: "2rem"}}>
                    Popular Recipes
                </Typography>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={'auto'}
                    freeMode={true}
                    grabCursor={true}
                    style={{marginTop: '24px'}}
                >
                    {recipes.map((recipe) => (
                        <SwiperSlide key={recipe.id} style={{width: 'auto'}}>
                            <Link to={`/recipes/${recipe.id}`} style={{
                                textDecoration: "none",
                                color: "inherit",
                                display: "block",
                            }}>
                                <img src={recipe.image} alt={recipe.title} style={{
                                    width: "100%",
                                    aspectRatio: "4/3",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                                }}/>
                                <Typography variant="body1" sx={{fontWeight: "700"}}>
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
