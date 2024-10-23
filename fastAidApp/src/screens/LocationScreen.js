// LocationScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const LocationScreen = () => {
  const location = useSelector((state) => state.location);

  return (
    <View>
      {location && (
        <Text>
          Latitude: {location.latitude}{'\n'}
          Longitude: {location.longitude}
        </Text>
      )}
    </View>
  );
};

export default LocationScreen;

// Similarly update SpeedScreen.js and AltitudeScreen.js
