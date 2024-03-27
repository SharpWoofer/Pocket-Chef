import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import User from '../Models/user.js';

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_KEY);
}

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {username, email, password, goals, activities, height, width, firstName, lastName, age, gender} = req.body;

        if (!email || !username || !password){
            return res.status(400).json({ error: 'All fields must be filled' })
        }
        if (!validator.isEmail(email)){
            return res.status(400).json({ error: 'Invalid email' })
        }

        if (await User.findOne({
            $or: [
                { username },
                { email }
            ]
        })) {
            return res.status(400).json({ error: 'The email address or user name has been registered' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            //picture: req.file.path,
            activities,
            height,
            width,
            goals,
            firstName,
            lastName,
            age,
            gender
        });
        const savedUser = await newUser.save();
        const accessToken = createToken(savedUser._id);
        res.status(201).json({user: savedUser, accessToken});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

/* LOGIN USER */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User does not exist" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Wrong password" });
        }

        const accessToken = createToken(user._id);
        delete user.password;
        res.status(200).json({ token: accessToken, user });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
