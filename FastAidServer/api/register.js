const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/connection');

const router = express.Router();

// Registration endpoint
router.post('/', async (req, res) => {
    const { name, username, password, age, phone, email, gender } = req.body;

    // Basic validation
    if (!name || !username || !password || !age || !phone || !email || !gender) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Validate gender input
    const validGenders = ['Male', 'Female', 'Other'];
    if (!validGenders.includes(gender)) {
        return res.status(400).json({ success: false, message: 'Invalid gender value.' });
    }

    // Validate age
    if (age <= 0) {
        return res.status(400).json({ success: false, message: 'Age must be a positive number.' });
    }

    try {
        // Check if user already exists
        const [existingUser] = await pool.query(
            'SELECT id FROM users WHERE username = ?',
            [username]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: 'User already exists.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into `users` table
        const [result] = await pool.query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );

        const userId = result.insertId;

        // Insert details into `user_details` table
        await pool.query(
            `INSERT INTO user_details (id, name, age, phone, email, gender)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [userId, name, age, phone, email, gender]
        );

        res.json({ success: true, message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;
