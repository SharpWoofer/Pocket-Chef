import {Grid, Stack, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useGetRecipeByIdQuery} from '../../store/apis/recipe';
import React from "react";
import Box from "@mui/material/Box";
//import './recipeStyles.css';


export default function Recipe() {
    const {id} = useParams();
    const {data: recipe, isLoading} = useGetRecipeByIdQuery(id);

    return (
        <Stack>
            {isLoading ? (
                <Typography variant="body1" align="center" style={{color: '#666', margin: '20px 0'}}>
                    Loading recipe...
                </Typography>
            ) : (
                recipe && (
                    <Stack>
                        <Box
                            sx={{
                                borderBottom: 2,
                                borderColor: '#12365F',
                                height: "12vh",
                            }}>
                            <Typography
                                variant="h1" // Changed from 'header1' to 'h1' for correct variant usage
                                sx={{
                                    color: '#12365F',
                                    textAlign: 'start',
                                    fontSize: "9vh",
                                    paddingLeft: "0.2em",
                                    fontWeight: "bolder",
                                    letterSpacing: "2px",
                                    paddingBottom: "0.25em", // Adjust this value as needed for proper underline spacing
                                }} padding={2}>
                                {recipe.title}
                            </Typography>
                        </Box>

                        <Stack direction="row" style={{justifyContent: "space-around"}}>
                            <Grid sx={{width: "45%", heigt: "100%"}}>
                                <Stack style={{display: "flex", justifyContent: "center", height: "100%"}}>
                                    <Box
                                        sx={{
                                            height: "100%",
                                            mt: 2,
                                            width: "100%",
                                            ml: "0em",  // This is the same as marginLeft but using the shorthand property
                                            border: 1,
                                            borderColor: 'divider',
                                            borderRadius: 2,
                                            p: 2,
                                            bgcolor: 'background.paper',
                                            boxShadow: 1,
                                            '&:hover': {
                                                boxShadow: 3,
                                            },
                                        }}
                                    >
                                        <img src={recipe.image}
                                             style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                                    </Box>
                                </Stack>
                            </Grid>
                            <Grid sx={{width: "60%"}}>
                                <Box
                                    sx={{
                                        mt: 2,
                                        width: "80%",
                                        border: 1,
                                        borderColor: 'divider',
                                        borderRadius: 2,
                                        p: 2,
                                        bgcolor: 'background.paper',
                                        boxShadow: 1,
                                        '&:hover': {
                                            boxShadow: 3,
                                        },
                                    }}
                                >
                                    <Typography variant="body1" color="primary"
                                                sx={{mb: 1, fontWeight: 'bold', fontSize: '1.7rem'}}>
                                        Incredient List
                                    </Typography>
                                    {recipe.extendedIngredients.map(ingredient => (
                                        <Typography variant="body1" color="text.primary"
                                                    sx={{mt: 0.1, ml: 1, fontSize: '1.1rem'}}>
                                            ⚫ {ingredient.original}
                                        </Typography>
                                    ))}
                                </Box>
                                <Box
                                    sx={{
                                        mt: 2,
                                        width: "100%",
                                        border: 1,
                                        borderColor: 'divider',
                                        borderRadius: 2,
                                        p: 2,
                                        bgcolor: 'background.paper',
                                        boxShadow: 1,
                                        '&:hover': {
                                            boxShadow: 3,
                                        },
                                    }}
                                >
                                    <Typography variant="body1" color="primary"
                                                sx={{mb: 1, fontWeight: 'bold', fontSize: '1.7rem'}}>
                                        Recipe Instructions
                                    </Typography>
                                    <Typography variant="body1" color="text.primary"
                                                sx={{mt: 0.1, ml: 1, fontSize: '1.1rem'}}>
                                        {recipe.instructions}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Stack>
                        <Stack sx={{ml: 2}} style={{width: "70%"}}>
                            <Box
                                sx={{
                                    mt: 2,
                                    width: "60%",
                                    border: 1,
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                    p: 2,
                                    bgcolor: 'background.paper',
                                    boxShadow: 1,
                                    '&:hover': {
                                        boxShadow: 3,
                                    },
                                }}
                                style={{display: "flex", justifyContent: "start"}}
                            >
                                <Typography variant="body1" color="primary"
                                            sx={{mb: 0.2, fontWeight: 'bold', fontSize: '1.7rem'}}>
                                    Time to Cook:
                                </Typography>
                                <Typography variant="body1" color="text.primary"
                                            sx={{fontSize: '1.3rem', mt: 0.7, mr: 2, ml: 1}}>
                                    {recipe.readyInMinutes} minutes
                                </Typography>
                                <Typography variant="body1" color="primary"
                                            sx={{mb: 0.2, fontWeight: 'bold', fontSize: '1.7rem'}}>
                                    Suitable for:
                                </Typography>
                                <Typography variant="body1" color="text.primary"
                                            sx={{fontSize: '1.3rem', mt: 0.7, mr: 2, ml: 1}}>
                                    {recipe.servings} servings
                                </Typography>
                            </Box>
                        </Stack>

                    </Stack>
                )
            )}
        </Stack>

    );
}