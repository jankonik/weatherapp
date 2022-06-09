// let dt;

// const mixa = weatherNiz.filter( (w, index) => {
//   if(index===0) {
//     dt = w.dt;
//     return w;
//   }

//   if(w.dt !== dt) {
//     dt = w.dt;
//     return w
//   }

//   return;
// } )

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { forecast } from '../components/search/search';

// Define a type for the slice state
interface weatherState {
  forecast: {
    dt: number;
    main: {
      temp: number;
    };
    loading: boolean;
  };
}

// Define the initial state using that type
const initialState: weatherState = {
  forecast: {
    dt: 0,
    main: {
      temp: 0,
    },
    loading: false,
  },
};

export const weatherSlice = createSlice({
  name: 'weather',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    weatherRequested: (state, action) => {
      state.forecast.loading = true;
    },
    weatherRecieved: (state, action) => {
      state.forecast = action.payload;
      state.forecast.loading = false;
    },
    weatherRequestFailed: (state, action) => {
      state.forecast.loading = false;
    },
  },
});

export const { weatherRequested, weatherRecieved, weatherRequestFailed } =
  weatherSlice.actions;

export default weatherSlice.reducer;
