import axios from 'axios';

export const searchExercises = async (req, res) => {
    const muscle = req.query.muscle;
    const name = req.query.name;
    const type = req.query.type;
    const difficulty = req.query.difficulty;

    const options = {
        method: 'GET',
        url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
        params: {
            name: name,
            type: type,
            muscle: muscle,
            difficulty: difficulty
        },
        headers: {
            'X-RapidAPI-Key': '3cfb686e5emsh3b0b0769867433fp10d673jsnb0425b9d0c21',
            'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data); // Sending the results back to the frontend
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: error.message });
    }
};

export default { searchExercises };