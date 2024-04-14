import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import User from '../Models/user.js';
import UserWeight from '../Models/userWeight.js';

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_KEY);
}

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            goals,
            activities,
            height,
            width,
            firstName,
            lastName,
            age,
            gender
        } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({error: 'All fields must be filled'})
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({error: 'Invalid email'})
        }

        if (await User.findOne({
            $or: [
                {username},
                {email}
            ]
        })) {
            return res.status(400).json({error: 'The email address or user name has been registered'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            // picture: req.file.path,
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
        const {username, password} = req.body;
        if (!username || !password) {
            return res.status(400).json({error: "username and password are required"});
        }
        const user = await User.findOne({
            $or: [{username}, {email: username}]
        });
        if (!user) {
            return res.status(404).json({error: "User does not exist"});
        }
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({error: "Wrong password"})
        }

        const accessToken = createToken(user._id);
        delete user.password;
        res.status(200).json({token: accessToken, user});
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({error: "Internal server error"});
    }
};

//fav recipes
export const addFavoriteRecipe = async (req, res) => {
    const {userId, recipeName} = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {$addToSet: {favoriteRecipes: recipeName}}, // Use $addToSet to avoid duplicates
            {new: true} // Returns the updated user
        );

        if (updatedUser) {
            res.status(200).json({message: 'Favorite recipe added.', user: updatedUser});
        } else {
            res.status(404).json({message: 'User not found.'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


/**
 * Weight Line Chart
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const addUserWeight = async (req, res) => {
    try {
        const mBody = req.body
        const mUser = req.user

        const mRes = await UserWeight.insertMany([
            {
                ...mBody,
                user: mUser._id
            }
        ])
        res.send(mRes)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

/**
 * getUserWeightList
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getUserWeightList = async (req, res) => {
    try {
        const mUser = req.user

        const mRes = await UserWeight.find({user: mUser._id})
        res.send(mRes)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

/**
 * setUserInfo
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const setUserInfo = async (req, res) => {
    try {
        const mUser = req.user
        const mBody = req.body
        delete mBody._id
        const mRes = await User.updateOne({_id: mUser._id}, mBody)
        res.send(mRes)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
