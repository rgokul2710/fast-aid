import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';  // Import react-native-modal
import LocationScreen from './LocationScreen';
import AltitudeScreen from './AltitudeScreen';
import SpeedScreen from './SpeedScreen';
import DecibelScreen from './DecibelScreen';
import Gyroscope from './GyroscopeScreen';

const RideScreen = ({ endRide }) => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Show the modal
    const toggleModal = () => setIsModalVisible(!isModalVisible);

    // Handle the "Call Ambulance" action
    const handleCallAmbulance = () => {
        toggleModal();
    };

    // Handle "Yes" action in the modal
    const handleAccidentConfirmation = () => {
        // Navigate to the Accident screen
        endRide();
        navigation.navigate('Accident');
        toggleModal();  // Close the modal
    };

    // Handle "No" action in the modal
    const handleCancel = () => {
        toggleModal();  // Simply close the modal
    };

    return (
        <View style={styles.rideContainer}>
            <View style={styles.row1}>
                <View style={styles.column}>
                    <View style={styles.viewBlockLarge}>
                        <LocationScreen />
                    </View>
                    <View style={styles.viewBlockMedium}>
                        <AltitudeScreen />
                    </View>
                </View>

                <View style={styles.column}>
                    <View style={styles.viewBlockMedium}>
                        <SpeedScreen />
                    </View>
                    <View style={styles.viewBlockLarge}>
                        <Gyroscope />
                    </View>
                </View>
            </View>

            <View style={styles.row2}>
                <View style={styles.viewBlockSmall}>
                    <DecibelScreen />
                </View>
            </View>

            <View style={styles.row3}>
                <TouchableOpacity style={styles.buttonLarge} onPress={endRide}>
                    <Text style={styles.buttonText}>End Ride</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLarge} onPress={handleCallAmbulance}>
                    <Text style={styles.buttonText}>Call Ambulance</Text>
                </TouchableOpacity>
            </View>

            {/* Fancy Modal */}
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} animationIn="fadeInDown" animationOut="fadeOutUp">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Met with an accident?</Text>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
                            <Text style={styles.modalButtonText}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={handleAccidentConfirmation}>
                            <Text style={styles.modalButtonText}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    row3: {
        flexDirection: 'row',
        flex: 0.5,
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
        borderColor: '#007bff',
    },
    viewBlockMedium: {
        flex: 2,
        margin: 4,
        padding: 3,
        borderRadius: 10,
        backgroundColor: '#007bff',
        borderWidth: 5,
        borderColor: '#007bff',
    },
    viewBlockSmall: {
        flex: 1,
        margin: 4,
        padding: 3,
        borderRadius: 10,
        backgroundColor: '#007bff',
        borderWidth: 5,
        borderColor: '#007bff',
    },
    buttonLarge: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },

    // Fancy Modal Styles
    modalContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#123456'
    },
    modalButtons: {
        flexDirection: 'row',
    },
    modalButton: {
        backgroundColor: '#007bff',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    modalButtonText: {
        color: '#ffffff',
        fontSize: 18,
    },
});

export default RideScreen;
