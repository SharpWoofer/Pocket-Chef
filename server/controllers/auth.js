import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            picture: req.file.path
        });
        const savedUser = await newUser.save();
        res.status(201).json({user});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

/* LOGIN USER */
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        !user && res.status(404).json("User does not exist");
        const validPassword = await bcrypt.compare(password, user.password);
        !validPassword && res.status(400).json("Wrong password");
        const accessToken = jwt.sign({id: user._id,}, process.env.SECRET_KEY);
        delete user.password;
        res.status(200).json({token, user});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}