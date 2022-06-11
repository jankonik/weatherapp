import React from 'react';
import Layout from './components/layout/main-layout';
import Search from './components/search/search';
import AvgTemp from './components/avgTemp/avgTemp';
import DailyTemp from './components/dailyTemp/dailyTemp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector, useAppDispatch } from './app/hooks';
import store from './app/store';
import { loadingForecastError } from './features/weatherSlice';

function App() {
  const error = useAppSelector((state) => state.weather.message);
  const dispatch = useAppDispatch();
  if (error) {
    toast.error('Error!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      hideProgressBar: true,
    });
  }

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
