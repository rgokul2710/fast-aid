import { setAccident } from "../../store";


let currentData = null;
let previousData = null; // Add previousData to store the last known values
let alertTriggered = false;
let startDetection = false;

const sensorTimestamps = {
    speed: null,
    altitude: null,
    sound: null,
    gyroscope: null,
};

const changeFlags = {
    speed: false,
    altitude: false,
    sound: false,
    gyroscope: false,
};

const THRESHOLD = {
    speed: 0,
    altitude: 1,
    sound: 15,
    gyroscope: 1,
};

const triggerAlert = (dispatch) => {
    if (alertTriggered) return;
    alertTriggered = true;
    dispatch(setAccident({accidentDetected: true}))
    console.log("Alert: Sudden change detected!");
    // Implement your alert logic here (e.g., notification, emergency contact)
};

const resetChangeFlag = (sensor) => {
    if (Date.now() - sensorTimestamps[sensor] > 5000) {
        changeFlags[sensor] = false;
    }
};

const checkForSuddenChange = (location, rotation, decibelLevel, dispatch) => {
    const currentTime = Date.now();

    // Speed: Drop to 0 within 2 seconds
    if (location.speed === 0 && previousData && sensorTimestamps.speed && (currentTime - sensorTimestamps.speed < 2000)) {
        changeFlags.speed = true;
        sensorTimestamps.speed = currentTime;
    }

    // Altitude: Sudden change from previous value
    if (previousData && Math.abs(location.altitude - previousData.altitude) > THRESHOLD.altitude) {
        changeFlags.altitude = true;
        sensorTimestamps.altitude = currentTime;
    }

    // Sound: Sudden change from previous value
    if (previousData && Math.abs(decibelLevel - previousData.soundLevel) > THRESHOLD.sound) {
        changeFlags.sound = true;
        sensorTimestamps.sound = currentTime;
    }

    // Gyroscope: Sudden change in X, Y, or Z from previous value
    if (
        previousData && (
            Math.abs(rotation.x - previousData.gyroscope.x) > THRESHOLD.gyroscope ||
            Math.abs(rotation.y - previousData.gyroscope.y) > THRESHOLD.gyroscope ||
            Math.abs(rotation.z - previousData.gyroscope.z) > THRESHOLD.gyroscope
        )
    ) {
        changeFlags.gyroscope = true;
        sensorTimestamps.gyroscope = currentTime;
    }

    // Reset change flags if more than 5 seconds have passed
    Object.keys(changeFlags).forEach(resetChangeFlag);

    // Check if 3 or more change flags are true
    const changesDetected = Object.values(changeFlags).filter((flag) => flag).length;

    if (changesDetected >= 3) {
        triggerAlert(dispatch);
    }
};

const updateTimestamps = (location, rotation, decibelLevel) => {
    // Update currentData with the latest values
    previousData = { ...currentData }; // Store the previous state
    currentData = {
        speed: location.speed,
        altitude: location.altitude,
        soundLevel: decibelLevel,
        gyroscope: { ...rotation },
    };
};

export const startAccidentDetection = (location, rotation, decibelLevel, dispatch) => {
    if (!startDetection) {
        // Delay the start by 30 seconds (30000 ms)
        setTimeout(() => {
            startDetection = true;

            // Initialize currentData with the first sensor readings
            currentData = {
                speed: location.speed,
                altitude: location.altitude,
                soundLevel: decibelLevel,
                gyroscope: { ...rotation },
            };

            previousData = null; // No previous data at the start

            Object.keys(sensorTimestamps).forEach((key) => {
                sensorTimestamps[key] = Date.now();
            });

            console.log("Accident detection started.");
        }, 30000);
    }

    if (startDetection && currentData && !alertTriggered) {
        updateTimestamps(location, rotation, decibelLevel);
        checkForSuddenChange(location, rotation, decibelLevel, dispatch);
    }
};
