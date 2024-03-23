import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetRecipeByIdQuery } from '../../store/apis/recipe';

export default function Recipe() {
    const { id } = useParams()
    const { data: recipe, isLoading } = useGetRecipeByIdQuery(id);
    console.log(recipe)

    return (
        <Container maxWidth="md" sx={{
            paddingY: 2
        }}>
            {
                isLoading ?
                    <Typography variant="body1" align="center">
                        Loading recipe...
                    </Typography>
                    : (
                        <div>
                            <img src={recipe.image} alt={recipe.title} style={{ width: "100%", height: '200px', objectFit: "cover" }} />
                            <Typography variant="h2" fontSize={32} paddingTop={2}>
                                {recipe.title}
                            </Typography>
                            <p>Ready in: {recipe.readyInMinutes} minutes</p>
                            <p>Servings: {recipe.servings}</p>
                            <h3>Ingredients:</h3>
                            <ul>
                                {recipe.extendedIngredients.map(ingredient => (
                                    <li key={ingredient.id}>{ingredient.original}</li>
                                ))}
                            </ul>
                            <h3>Instructions:</h3>
                            <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
                        </div >
                    )
            }
        </Container>
    )
}