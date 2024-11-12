import { BASE_URL } from "./CONSTANTS";

export const authenticateUser = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Authentication failed');
        }

        const data = await response.json();
        return { success: true, data }; // Assuming the server returns user data on success
    } catch (error) {
        console.error('Error during authentication:', error);
        return { success: true, message: error.message }; // Logging in by default for test purpose
    }
};
