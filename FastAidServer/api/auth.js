const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/connection');

const router = express.Router();

// Authentication endpoint
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    try {
        // Find the user in the database
        const [rows] = await pool.query(
            'SELECT id, password FROM users WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.status(400).json({ success: false, message: 'User not found.' });
        }

        const user = rows[0];

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid password.' });
        }

        res.json({ success: true, message: 'Login successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;
