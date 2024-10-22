import { BASE_URL } from "./CONSTANTS";

// Function to register a user
export const registerUser = async (name, username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                username,
                password,
            }),
        });

        const data = await response.json(); // Parse the JSON response

        // Check for HTTP status code
        if (!response.ok) {
            throw new Error(data.message || 'Registration failed. Please try again later.');
        }

        return data; // Return the server response
    } catch (error) {
        console.error('Registration error:', error.message);
        return {
            success: false,
            message: error.message,
        };
    }
};
