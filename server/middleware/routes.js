import express from 'express';
import { register, login } from './auth.js';
import verifyToken from './verifyToken.js';

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Protected route example
router.get('/protected', verifyToken, (req, res) => {
    // Access user ID from req.user
    const userId = req.user._id;
    res.json({ message: 'Protected route accessed', userId });
});

export default router;
