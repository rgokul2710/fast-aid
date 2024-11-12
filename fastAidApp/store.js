import { configureStore, createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    speed: 0,
    altitude: 0,
    latitude: 0,
    longitude: 0,
  },
  reducers: {
    setLocation: (state, action) => action.payload,
  },
});

const decibelSlice = createSlice({
  name: 'decibel',
  initialState: {
    level: 0,
  },
  reducers: {
    setDecibelLevel: (state, action) => {
      state.level = action.payload;
    },
  },
});

const gyroSlice = createSlice({
    name: 'gyro',
    initialState : {
        x: 0.1,
        y: 0.1,
        z: 0.1
    },
    reducers: {
        setGyro: (state, action) => action.payload,
    }
});

const accidentSlice = createSlice({
    name: 'accident',
    initialState : {
        accidentDetected: false,
    },
    reducers: {
        setAccident : (state, action) => action.payload,
    }
});

// Export the actions
export const { setLocation } = locationSlice.actions;
export const { setDecibelLevel } = decibelSlice.actions;
export const { setGyro } = gyroSlice.actions;
export const { setAccident } = accidentSlice.actions;

// Create the store
const store = configureStore({
  reducer: {
    location: locationSlice.reducer,
    decibel: decibelSlice.reducer,
    gyro: gyroSlice.reducer,
    accident: accidentSlice.reducer
  },
});

export default store;
