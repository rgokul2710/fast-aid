// LocationScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const SpeedScreen = () => {
  const location = useSelector((state) => state.location);

  return (
    <View>
      {location && (
        <Text>
          Speed: {location.speed}{'\n'}
        </Text>
      )}
    </View>
  );
};

export default SpeedScreen;
