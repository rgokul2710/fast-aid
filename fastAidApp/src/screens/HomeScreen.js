import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../assets/animation.json')} // Update the path to your Lottie file
                autoPlay
                loop
                style={styles.animation}
            />
            <TouchableOpacity style={styles.button} onPress={() => {/* Start a ride logic here */}}>
                <Text style={styles.buttonText}>Start a ride?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    animation: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default HomeScreen;
