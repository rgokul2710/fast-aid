import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice for location
const locationSlice = createSlice({
  name: 'location',
  initialState: null,
  reducers: {
    setLocation: (state, action) => action.payload,
  },
});

// Create a slice for decibel level
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

// Export the actions
export const { setLocation } = locationSlice.actions;
export const { setDecibelLevel } = decibelSlice.actions;

// Create the store
const store = configureStore({
  reducer: {
    location: locationSlice.reducer,
    decibel: decibelSlice.reducer, // Add the decibel reducer here
  },
});

export default store;
