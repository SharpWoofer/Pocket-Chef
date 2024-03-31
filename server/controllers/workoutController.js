import axios from 'axios';

export const searchExercises = async (req, res) => {
    const muscle = req.body.muscle;
    const options = {
        method: 'GET',
        url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
        params: { muscle: muscle, offset:'50' },
        headers: {
            'X-RapidAPI-Key': '595b8c7923msha97e6a5c944a4bep1d3d15jsnbf74c79a09b3',
            'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data); // Sending the results back to the frontend
    } catch (error) {
        console.log("Failed here");
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
};


export default { searchExercises };