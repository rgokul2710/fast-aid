// LocationScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const AltitudeScreen = () => {
  const location = useSelector((state) => state.location);

  return (
    <View>
      {location && (
        <Text>
          Altitude: {location.altitude}{'\n'}
        </Text>
      )}
    </View>
  );
};

export default AltitudeScreen;

