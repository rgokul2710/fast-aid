import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

const AltitudeScreen = () => {
  const location = useSelector((state) => state.location);
  const [currentAltitude, setCurrentAltitude] = useState(
    location ? location.altitude : 0
  );
  const [loading, setLoading] = useState(true); // Loading state

  // Shared value for animation
  const animatedAltitude = useSharedValue(currentAltitude);

  // Update altitude with animation
  useEffect(() => {
    if (location) {
      if (loading) {
        setLoading(false); // Set loading to false when location updates
      }

      // Update currentAltitude and animatedAltitude when location changes
      if (location.altitude !== currentAltitude) {
        setCurrentAltitude(location.altitude); // Set the final altitude
        animatedAltitude.value = withTiming(location.altitude, {
          duration: 200, // Duration for the initial jump to the new altitude
          easing: Easing.out(Easing.quad), // Smoother easing
        });
      }
    }
  }, [location]);

  // Animated style for the list container
  const animatedStyle = useAnimatedStyle(() => {
    const decimalPart = animatedAltitude.value % 1;
    return {
      transform: [
        {
          translateY: -decimalPart * 30, // Adjust for rolling effect
        },
      ],
    };
  });

  // Generate altitude values for the rolling effect
  const getAltitudeList = () => {
    const baseAltitude = Math.floor(currentAltitude * 10) / 10;
    return [
      (baseAltitude - 0.2).toFixed(1),
      (baseAltitude - 0.1).toFixed(1),
      baseAltitude.toFixed(1),
      (baseAltitude + 0.1).toFixed(1),
      (baseAltitude + 0.2).toFixed(1),
    ];
  };

  const altitudes = getAltitudeList();

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Loading altitude...</Text>
      ) : (
        <View style={styles.altitudeWrapper}>
          <Animated.View style={[styles.animatedContainer, animatedStyle]}>
            {altitudes.map((altitude, index) => (
              <Text
                key={index}
                style={[
                  styles.altitudeText,
                  index === 2 ? styles.currentAltitudeText : styles.otherAltitudeText,
                ]}
              >
                {altitude}
              </Text>
            ))}
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 24,
    color: 'black',
  },
  altitudeWrapper: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  altitudeText: {
    fontSize: 24,
    lineHeight: 30,
  },
  currentAltitudeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  otherAltitudeText: {
    fontSize: 20,
    color: 'gray',
  },
});

export default AltitudeScreen;
