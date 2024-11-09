import { gyroscope, SensorTypes, setUpdateIntervalForType } from "react-native-sensors";

export const startGyroscope = (setGyro) => {
    let gyroSubscription = null;
    setUpdateIntervalForType(SensorTypes.gyroscope, 50);
    gyroSubscription = gyroscope.subscribe(
        (data) => {
          const newRotation = {
            x: (data.x) * 0.2,
            y: (data.y) * 0.2,
            z: (data.z) * 0.2,
          };
          setGyro(newRotation);
        }
      );
}

export const stopGyroscope = () => {

}
