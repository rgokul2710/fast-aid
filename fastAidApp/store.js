import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice for location
const locationSlice = createSlice({
  name: 'location',
  initialState: null,
  reducers: {
    setLocation: (state, action) => action.payload,
  },
});

// Export the action
export const { setLocation } = locationSlice.actions;

// Create the store
const store = configureStore({
  reducer: {
    location: locationSlice.reducer,
  },
});

export default store;
