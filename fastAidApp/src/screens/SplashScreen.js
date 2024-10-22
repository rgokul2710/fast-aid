import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        // Simulate a loading time
        setTimeout(() => {
            navigation.replace('SignIn');
        }, 2000); // 2 seconds delay
    }, []);

    return (
        <View style={styles.container}>
            <LottieView
                source={require('../assets/animation.json')} // Path to your Lottie file
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Background color matching the example
    },
    animation: {
        width: 150, // Adjust as necessary
        height: 150,
    },
});

export default SplashScreen;
