import React, { useEffect } from 'react';
import Layout from './components/layout/main-layout';
import Search from './components/search/search';
import AvgTemp from './components/avgTemp/avgTemp';
import DailyTemp from './components/dailyTemp/dailyTemp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { loadingForecastError } from './features/weatherSlice';

function App() {
  const error = useAppSelector((state) => state.weather.errorMessage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      toast.error('City not found!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
      });
      dispatch(loadingForecastError(''));
    }
  }, [error]);

  return (
    <div className="App">
      <ToastContainer />
      <Layout>
        <Search />
        <AvgTemp />
        <DailyTemp />
      </Layout>
    </div>
  );
}

export default App;
