const axios = require('axios');

const searchByName = async (req, res) => {
    //Parameter Fields:
    const { Name } = req.params.nameParam;
    const { Muscle } = req.params.muscleParam;
    const { Difficulty } = req.params.difficultyParam;
    const searchName = {
        method: 'GET',
        url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
        params: {name: Name, muscle: Muscle, difficulty: Difficulty},
        headers: {
          'X-RapidAPI-Key': 'e474e5b38dmsh9fcb2cfd3d3e1b6p160518jsnaf6f4cd120f4',
          'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(searchName);
        //console.log(response.data);  Debugging
        res.status(200).json(response.data);
    } catch (error) {
        //console.error(error); Debugging
        res.status(500).json({ error: error.message });
    }
};
