import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import RideScreen from './RideScreen';

const HomeScreen = () => {
    const [rideStarted, setRideStarted] = useState(false);

    const startRide = () => {
        setRideStarted(true);
    };

    const endRide = () => {
        setRideStarted(false);
    };

    return (
        <View style={styles.container}>
            {!rideStarted ? (
                <>
                    <LottieView
                        source={require('../assets/animation.json')}
                        autoPlay
                        loop
                        style={styles.animation}
                    />
                    <TouchableOpacity style={styles.button} onPress={startRide}>
                        <Text style={styles.buttonText}>Start a ride?</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <RideScreen endRide={endRide} />
            )}
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
    }
});

export default HomeScreen;
