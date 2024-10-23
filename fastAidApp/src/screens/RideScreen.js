import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LocationScreen from './LocationScreen';
import AltitudeScreen from './AltitudeScreen';
import SpeedScreen from './SpeedScreen';

const RideScreen = ({ endRide }) => {
    return (
        <View style={styles.rideContainer}>

            <View style={styles.row1}>

                <View style={styles.column}>
                    <View style={styles.viewBlockLarge}>
                        <LocationScreen/>
                    </View>
                    <View style={styles.viewBlockMedium}>
                        <AltitudeScreen/>
                    </View>
                </View>

                <View style={styles.column}>
                    <View style={styles.viewBlockMedium}>
                        <SpeedScreen/>
                    </View>
                    <View style={styles.viewBlockLarge}>
                        <Text>123</Text>
                    </View>
                </View>
            </View>

            <View style={styles.row2}>
                <View style={styles.viewBlockSmall}>
                    <Text>123</Text>
                </View>
            </View>

            <View style={styles.row3}>
                <TouchableOpacity style={styles.buttonLarge} onPress={endRide}>
                    <Text style={styles.buttonText}>End Ride</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLarge} onPress={() => {/* Call ambulance logic */}}>
                    <Text style={styles.buttonText}>Call Ambulance</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    rideContainer: {
        flex: 1,
        padding: 4,
        width: '100%',
        flexDirection: 'column',
    },
    row1: {
        flex: 5,
        flexDirection: 'row',
    },
    row2: {
        flex: 1,
    },
    row3:{
        flexDirection: 'row',
        flex: 0.5
    },
    column: {
        flex: 1,
    },
    viewBlockLarge: {
        flex: 3,
        margin: 4,
        padding: 3,
        borderRadius: 10,
        backgroundColor: '#007bff',
        borderWidth: 5,
        borderColor: '#007bff'
    },
    viewBlockMedium: {
        flex: 2,
        margin: 4,
        padding: 3,
        borderRadius: 10,
        backgroundColor: '#007bff',
        borderWidth: 5,
        borderColor: '#007bff'
    },
    viewBlockSmall: {
        flex: 1,
        margin: 4,
        padding: 3,
        borderRadius: 10,
        backgroundColor: '#007bff',
        borderWidth: 5,
        borderColor: '#007bff'
    },
    buttonLarge: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#ffffff', // Ensure text is white for visibility
        fontSize: 16,
        textAlign: 'center',
    },
});

export default RideScreen;





