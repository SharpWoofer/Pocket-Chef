import axios from 'axios';
import { Box, IconButton, ImageList, ImageListItem, InputBase, Typography } from '@mui/material';
import { useState } from 'react';
import { Search } from "@mui/icons-material";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({});
  const [recipeId, setRecipeId] = useState('');
  const [loading, setLoading] = useState(false)
  const fetchRecipe = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:5000/searchRecipe/search/${recipeId}`);
      console.log(response.data.results);
      setRecipe(response.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setLoading(false)
    }
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          fetchRecipe()
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', background: '#fff' }}
          padding={1}
          borderBottom={'1px solid #ccc'}
        >
          <InputBase
            placeholder="Search for Recipes"
            sx={{ marginLeft: 1, flex: 1 }}
            onChange={(event) => {
              setRecipeId(event.target.value)
            }}
          />
          <IconButton
            color="primary"
            type='submit'
          >
            <Search />
          </IconButton>
        </Box>
      </form>
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