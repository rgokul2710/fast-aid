import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Animated, ToastAndroid } from 'react-native';
import LottieView from 'lottie-react-native'; // Import Lottie
import { authenticateUser } from '../api/authenticateUser'; // Import the API functions
import { registerUser } from '../api/registerUser'; // Import the API functions
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // State for name in sign up
    const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
    const [isSignUp, setIsSignUp] = useState(false); // State to toggle between sign in and sign up
    const navigation = useNavigation();

    // Email validation regex
    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSignIn = async () => {
        // Validate input
        if (!username || !password) {
            ToastAndroid.show('Please fill in all fields!', ToastAndroid.SHORT);
            return;
        }

        if (!isValidEmail(username)) {
            ToastAndroid.show('Please enter a valid email!', ToastAndroid.SHORT);
            return;
        }

        const response = await authenticateUser(username, password);

        if (response.success) {
            // Handle successful login (navigate or show success message)
            ToastAndroid.show('Login successful!', ToastAndroid.SHORT);
            // Inside SignInScreen.js, after successful login
            navigation.navigate('HomeDrawer'); // Replace with this line where you handle successful login
        } else {
            // Show error message from the server
            ToastAndroid.show(response.message || 'Login failed!', ToastAndroid.SHORT);
        }
    };

    const handleSignUp = async () => {
        // Validate input
        if (!name || !username || !password || !confirmPassword) {
            ToastAndroid.show('Please fill in all fields!', ToastAndroid.SHORT);
            return;
        }

        if (!isValidEmail(username)) {
            ToastAndroid.show('Please enter a valid email!', ToastAndroid.SHORT);
            return;
        }

        if (password !== confirmPassword) {
            ToastAndroid.show('Passwords do not match!', ToastAndroid.SHORT);
            return;
        }

        const response = await registerUser(name, username, password);

        if (response.success) {
            // Show success message and switch back to sign in
            ToastAndroid.show('Registration successful! You can now sign in.', ToastAndroid.SHORT);
            setIsSignUp(false); // Switch to sign in view
            resetFields(); // Reset input fields
        } else {
            // Show error message from the server
            ToastAndroid.show(response.message || 'Registration failed!', ToastAndroid.SHORT);
        }
    };

    const resetFields = () => {
        setUsername('');
        setPassword('');
        setName('');
        setConfirmPassword('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.animationContainer}>
                <LottieView
                    source={require('../assets/animation.json')} // Update the path as needed
                    autoPlay
                    loop
                    style={styles.animation}
                />
            </View>

            <Animated.View style={styles.signInContainer}>
                {isSignUp ? (
                    <>
                        <Text style={styles.labelText}>Name</Text>
                        <TextInput
                            placeholder="Name"
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                        <Text style={styles.labelText}>Username (Email)</Text>
                        <TextInput
                            placeholder="Username"
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                        />
                        <Text style={styles.labelText}>Password</Text>
                        <TextInput
                            placeholder="Password"
                            secureTextEntry={true}
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <Text style={styles.labelText}>Confirm Password</Text>
                        <TextInput
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            style={styles.input}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                                <Text style={styles.buttonText}>Register</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.backButton]}
                                onPress={() => {
                                    setIsSignUp(false); // Switch back to sign in
                                    resetFields(); // Reset input fields
                                }}
                            >
                                <Text style={styles.buttonText}>Back</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <>
                        <Text style={styles.labelText}>Username (Email)</Text>
                        <TextInput
                            placeholder="Username"
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                        />
                        <Text style={styles.labelText}>Password</Text>
                        <TextInput
                            placeholder="Password"
                            secureTextEntry={true}
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                                <Text style={styles.buttonText}>Sign In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.signUpButton]}
                                onPress={() => setIsSignUp(true)} // Switch to sign up view
                            >
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#f0f0f0',
    },
    animationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    signInContainer: {
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#fff',
        elevation: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    labelText: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        color: '#000',
        fontSize: 18,
        backgroundColor: '#f9f9f9',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        flex: 1,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    backButton: {
        backgroundColor: '#F44336', // Different color for Back button
    },
    signUpButton: {
        backgroundColor: '#2196F3', // Different color for Sign Up button
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    animation: {
        width: 150,
        height: 150,
    },
});

export default SignIn;
