const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

// Mock database
let users = [];

// Registration endpoint
router.post('/', async (req, res) => {
    const { name, username, password } = req.body;

    // Basic validation
    if (!name || !username || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists.' });
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ name, username, password: hashedPassword });

    res.json({ success: true, message: 'User registered successfully!' });
});

module.exports = router;
