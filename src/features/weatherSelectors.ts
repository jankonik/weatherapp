import { RootState } from '../app/store';

export const selectForecast = (state: RootState) => state.weather.forecast;
export const selectLoading = (state: RootState) => state.weather.loading;
