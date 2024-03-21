import {containerClasses, ImageList, ImageListItem, Typography} from '@mui/material';
import { useEffect, useState } from 'react';
import request from '../../utils/request';
import "./style.css";

const RecipeDeck = () => {
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchRecipe = async () => {
        try {
            setLoading(true);
            const response = await request.get(`/searchRecipe/search/thai`);
            console.log(response.data.results);
            setRecipe(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching recipe:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipe();
    }, []);

    return (
        <div>
            {loading && <div>Loading....</div>}
            {recipe.results && (
                <div className="item-shelf">
                    <div className="item-container">
                        {recipe.results.slice(2, 6).map((item, i) => { // Use slice to limit to first 4 items
                            return (
                                <div className="box" key={i}>
                                    <img src={item.image} alt="" className="item-img" />
                                    <p className="item-title">{item.title}</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="item-container">
                        {recipe.results.slice(6, 10).map((item, i) => { // Use slice to limit to first 4 items
                            return (
                                <div className="box" key={i}>
                                    <img src={item.image} alt="" className="item-img" />
                                    <p className="item-title">{item.title}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeDeck;
