const express = require('express');
const bodyParser = require('body-parser');
const registerRoutes = require('./api/register');
const authRoutes = require('./api/auth');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/register', registerRoutes); // Mount registration routes
app.use('/login', authRoutes);         // Mount authentication routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
