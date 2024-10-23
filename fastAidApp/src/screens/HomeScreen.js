import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useDispatch } from 'react-redux';
import { startGeolocationUpdates, stopGeolocationUpdates } from '../services/GeolocationService';
import { setLocation } from '../../store'; // Import the action

import RideScreen from './RideScreen';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const [rideStarted, setRideStarted] = useState(false);

    const startRide = () => {
        setRideStarted(true);
        startGeolocationUpdates((locationData) => {
            dispatch(setLocation(locationData)); // Dispatch the action to set location
          });
    };

    const endRide = () => {
        setRideStarted(false);
        stopGeolocationUpdates();
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
