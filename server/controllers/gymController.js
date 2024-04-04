import Gym from '../Models/gym.js';

export const searchGym = async (req, res) => {
    const { query } = req.body;
    try {
        const response = await Gym.find({
            $or: [
                { name: { $regex: query, $options: 'i'}},
                { addressStreetName: { $regex: query, $options: 'i'}}
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default { searchGym };