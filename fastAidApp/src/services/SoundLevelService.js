import SoundLevel from 'react-native-sound-level';
import { PermissionsAndroid } from 'react-native';
const MAX_DECIBEL = Number(100);
const MIN_DECIBEL = Number(-110);

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
         const decibelLevel = Number(data.value);
         const decibel = (((decibelLevel - MIN_DECIBEL) / (MAX_DECIBEL - MIN_DECIBEL)) * 100).toFixed(2)
          setDecibelLevel(decibel); // data.value contains the decibel level
        };
    } else {
      console.warn('Location permission denied');
    }
  };

  export const stopSoundMeter = () => {
    SoundLevel.stop();
  };
