import {Container, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useGetRecipeByIdQuery} from '../../store/apis/recipe';
//import './recipeStyles.css';


export default function Recipe() {
    const {id} = useParams();
    const {data: recipe, isLoading} = useGetRecipeByIdQuery(id);

    return (
        <Container maxWidth="md" className="recipe-container">
            {
                isLoading ?
                    <Typography variant="body1" align="center">
                        Loading recipe...
                    </Typography>
                    : recipe && (
                    <div>
                        <img src={recipe.image} alt={recipe.title} className="recipe-image"/>
                        <Typography variant="h2" className="recipe-title">
                            {recipe.title}
                        </Typography>
                        <Typography variant="subtitle1" className="recipe-meta">
                            Ready in: {recipe.readyInMinutes} minutes
                        </Typography>
                        <Typography variant="subtitle1" className="recipe-meta">
                            Servings: {recipe.servings}
                        </Typography>
                        <Typography variant="h4" className="recipe-section-title">
                            Ingredients:
                        </Typography>
                        <ul className="recipe-list">
                            {recipe.extendedIngredients.map(ingredient => (
                                <li key={ingredient.id} className="recipe-list-item">{ingredient.original}</li>
                            ))}
                        </ul>
                        <Typography variant="h4" className="recipe-section-title">
                            Instructions:
                        </Typography>
                        <Typography variant="body1" className="recipe-instructions"
                                    dangerouslySetInnerHTML={{__html: recipe.instructions}}/>
                    </div>
                )
            }
        </Container>
    );
}