import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

let watchId = null;

const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    // For iOS, permissions are handled differently and do not need to be requested here
    return true; // Assume permission is granted for iOS
  }
};

export const startGeolocationUpdates = async (setLocationData) => {
  const hasPermission = await requestLocationPermission();
  
  if (hasPermission) {
    watchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, speed, altitude } = position.coords;
        setLocationData({ latitude, longitude, speed, altitude });
      },
      (error) => {
        console.log(error.message);
      },
      { enableHighAccuracy: true, distanceFilter: 0, interval: 1000, fastestInterval: 500 }
    );
  } else {
    console.warn('Location permission denied');
  }
};

export const stopGeolocationUpdates = () => {
  if (watchId !== null) {
    Geolocation.clearWatch(watchId);
    watchId = null; // Reset watchId after clearing
  }
};
