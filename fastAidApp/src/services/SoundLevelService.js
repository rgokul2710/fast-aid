import SoundLevel from 'react-native-sound-level';
import { PermissionsAndroid } from 'react-native';


const requestAudioPermission = async () => {
    if (Platform.OS === 'android') {
     try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
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
    }
  };


  export const startSoundMeter = async (setDecibelLevel) => {

    const hasPermission = await requestAudioPermission();
    if (hasPermission) {
        SoundLevel.start();
        SoundLevel.onNewFrame = (data) => {
          setDecibelLevel(data.value); // data.value contains the decibel level
        };
    } else {
      console.warn('Location permission denied');
    }
  };
  
  export const stopSoundMeter = () => {
    SoundLevel.stop();
  };


