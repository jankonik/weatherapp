import { RootState } from '../app/store';

export const selectCount = (state: RootState) => state.weather.forecast;
