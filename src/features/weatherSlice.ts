import { createSlice } from '@reduxjs/toolkit';
import { IList } from '../components/search/search';
import { AxiosError } from 'axios';

// Define a type for the slice state
interface weatherState {
  forecast: IList[] | null;
  message: boolean;
  loading: boolean;
}

// Define the initial state using that type
const initialState: weatherState = {
  forecast: null,
  message: false,
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
      state.forecast = payload.forecast;
      state.loading = payload.loading;
    },
    loadingForecastError: (
      state,
      { type, payload }: { type: string; payload: boolean }
    ) => {
      state.message = payload;
    },
  },
});

export const { loadingForecastSuccess, loadingForecast, loadingForecastError } =
  weatherSlice.actions;

export default weatherSlice.reducer;
