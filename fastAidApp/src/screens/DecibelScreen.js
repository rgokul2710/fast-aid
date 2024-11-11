import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { Svg, Path, G } from 'react-native-svg';

const DecibelScreen = () => {
  const decibelLevel = useSelector((state) => state.decibel.level); // Get the decibel level from the Redux store

  const getGradientColors = (normalizedLevel) => {
    if (normalizedLevel <= 25) {
      return ['green', 'green'];
    } else if (normalizedLevel <= 50) {
      return ['green', 'yellow'];
    } else if (normalizedLevel <= 75) {
      return ['green', 'yellow', 'orange'];
    } else {
      return ['green', 'yellow', 'orange', 'red'];
    }
  };

  const gradientColors = getGradientColors(decibelLevel);

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressBar, { width: `${decibelLevel}%` }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    decibelText: {
      fontSize: 18,
      marginBottom: 20,
    },
    progressBarContainer: {
      width: '100%',
      height: 20,
      backgroundColor: '#eee',
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 20,
    },
    progressBar: {
      height: '100%',
      borderRadius: 10,
    },
  });


export default DecibelScreen;
