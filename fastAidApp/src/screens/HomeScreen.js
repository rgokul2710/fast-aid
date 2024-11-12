import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { startGeolocationUpdates, stopGeolocationUpdates } from '../services/GeolocationService';
import { setDecibelLevel, setLocation, setGyro } from '../../store';
import RideScreen from './RideScreen';
import { startSoundMeter, stopSoundMeter } from '../services/SoundLevelService';
import { startGyroscope, stopGyroscope } from '../services/GyroscopeService';
import { startAccidentDetection } from '../services/AccidentService';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [rideStarted, setRideStarted] = useState(false);

    // Get state values
    const location = useSelector((state) => state.location);
    const rotation = useSelector((state) => state.gyro);
    const decibelLevel = useSelector((state) => state.decibel.level);
    const accidentDetected = useSelector((state) => state.accident.accidentDetected)

    // Create refs for state values
    const locationRef = useRef(location);
    const rotationRef = useRef(rotation);
    const decibelRef = useRef(decibelLevel);

    // Update refs whenever the state changes
    useEffect(() => {
        locationRef.current = location;
        rotationRef.current = rotation;
        decibelRef.current = decibelLevel;
    }, [location, rotation, decibelLevel]);

    useEffect(() => {
        if (accidentDetected) {
            endRide();
            // Navigate to the desired screen when accidentDetected is true
            navigation.navigate('Accident');
        }
    }, [accidentDetected, navigation]);

    const startRide = () => {
        setRideStarted(true);

        // Start geolocation, sound meter, and gyroscope updates
        startGeolocationUpdates((locationData) => {
            dispatch(setLocation(locationData));
        });
        startSoundMeter((decibel) => {
            dispatch(setDecibelLevel(decibel));
        });
        startGyroscope((gyroData) => {
            dispatch(setGyro(gyroData));
        });

        // Start accident detection with the latest state values using refs
        const interval = setInterval(() => {
            const currentLocation = locationRef.current;
            const currentRotation = rotationRef.current;
            const currentDecibelLevel = decibelRef.current;

            startAccidentDetection(currentLocation, currentRotation, currentDecibelLevel, dispatch);
        }, 500);

        // Store interval ID in a ref to clear it later
        intervalRef.current = interval;
    };

    const intervalRef = useRef(null);

    const endRide = () => {
        setRideStarted(false);
        stopGeolocationUpdates();
        stopSoundMeter();
        stopGyroscope();

        // Clear the interval to stop accident detection
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
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
