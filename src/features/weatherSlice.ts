import { createSlice } from '@reduxjs/toolkit';
import { IList } from '../components/search/search';

// Define a type for the slice state
interface weatherState {
  forecast: IList[] | null;
  loading: boolean;
}

// Define the initial state using that type
const initialState: weatherState = {
  forecast: null,
  loading: false,
};

export const weatherSlice = createSlice({
  name: 'weather',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loadingForecast: (
      state,
      { type, payload }: { type: string; payload: boolean }
    ) => {
      state.loading = payload;
    },
    loadingForecastSuccess: (
      state,
      {
        type,
        payload,
      }: {
        type: string;
        payload: {
          forecast: IList[];
          loading: boolean;
        };
      }
    ) => {
      state = {
        forecast: payload.forecast,
        loading: payload.loading,
      };
    },
    loadingForecastError: (state, action) => {
      // logika za error handling
    },
  },
});

export const { loadingForecastSuccess, loadingForecast } = weatherSlice.actions;

export default weatherSlice.reducer;
