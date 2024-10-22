const express = require('express');

const router = express.Router();

// Mock database
let users = [{username: "rgokul2710@gmail.com", password: "12345"}];

// Authentication endpoint
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    // Find the user
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ success: false, message: 'User not found.' });
    }

    // Check password
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
        return res.status(400).json({ success: false, message: 'Invalid password.' });
    }

    res.json({ success: true, message: 'Login successful!' });
});

module.exports = router;
