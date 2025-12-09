import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// User Signup
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if all fields are present
        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Email already registered" });
        }

        // Create new user (password will be hashed by the pre-save hook)
        const user = await User.create({ name, email, password });

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePhoto: user.profilePhoto || ''
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// User Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are present
        if (!email || !password) {
            return res.json({ success: false, message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Compare password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePhoto: user.profilePhoto || ''
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
