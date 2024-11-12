const express = require('express');
const pool = require('../db/connection');

const router = express.Router();

// Update location endpoint
router.post('/', async (req, res) => {
    const { id, latitude, longitude, type } = req.body;

    // Basic validation
    if (!id || !latitude || !longitude || !type) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (type !== 'user' && type !== 'helper') {
        return res.status(400).json({ success: false, message: 'Invalid type. Must be "user" or "helper".' });
    }

    try {
        let updateQuery;
        if (type === 'user') {
            // Update user_location table
            updateQuery = `INSERT INTO user_location (id, latitude, longitude)
                           VALUES (?, ?, ?)
                           ON DUPLICATE KEY UPDATE latitude = VALUES(latitude), longitude = VALUES(longitude)`;
        } else if (type === 'helper') {
            // Update helper_location table
            updateQuery = `INSERT INTO helper_location (id, latitude, longitude)
                           VALUES (?, ?, ?)
                           ON DUPLICATE KEY UPDATE latitude = VALUES(latitude), longitude = VALUES(longitude)`;
        }

        // Execute the query
        await pool.query(updateQuery, [id, latitude, longitude]);

        res.json({ success: true, message: 'Location updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;
