// LocationScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Speedometer from 'react-native-speedometer-chart';

const SpeedScreen = () => {
  const location = useSelector((state) => state.location);

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <Speedometer
            value={location.speed}
            totalValue={200}
            internalColor={getColor(location.speed)} // Dynamic color based on speed
            outerColor="#ff9999"
            showIndicator={true}
          />
          <Text style={styles.speedText}>{Math.floor(location.speed)} km/h</Text>
        </>
      ) : (
        <Text style={styles.initialText}>Waiting for speed data...</Text>
      )}
    </View>
  );
};

// Function to determine color based on speed with reversed order
const getColor = (speed) => {
  if (speed <= 20) return '#008000'; // Dark Green for Slow
  if (speed <= 50) return '#7fff00'; // Light Green for Normal
  if (speed <= 80) return '#ffff00'; // Yellow for Moderate
  if (speed <= 120) return '#ff7f00'; // Orange for Fast
  return '#ff0000'; // Red for Too Fast
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  initialText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#666', // Grey color for the waiting message
  },
});

export default SpeedScreen;