import {  ImageList, ImageListItem, Typography } from '@mui/material';
import {useEffect, useState} from 'react';
import request from '../../utils/request';

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({});
  const [recipeId, setRecipeId] = useState('');
  const [loading, setLoading] = useState(false)
  const fetchRecipe = async () => {
    try {
      setLoading(true)
      const response = await request.get(`/searchRecipe/search/pasta`);
      console.log(response.data.results);
      setRecipe(response.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecipe();
  },[]);

  return (
    <div>
      {
        loading && <div>Loading....</div>
      }
      {recipe.results && (
        <ImageList cols={4} sx={{ padding: 2 }}>{
          recipe.results.map((item, i) => {
            return (
              <ImageListItem
                key={i}
                sx={{
                  position: 'relative'
                }}
              >
                <img src={item.image} alt="" />
                <Typography
                  position={'absolute'}
                  color={'#fff'}
                  sx={{
                    background: 'rgba(0,0,0, .5)',
                    width: '100%',
                    bottom: 0,
                    padding: 1.5
                  }}
                >{item.title}</Typography>
              </ImageListItem>
            )
          })
        }</ImageList>
      )}
    </div>
  );
};

export default RecipeDetails;