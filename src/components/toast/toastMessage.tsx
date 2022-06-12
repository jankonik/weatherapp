import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector } from '../../app/hooks';
import store from '../../app/store';

const ToastMessage = () => {
  const forecast = useAppSelector((state) => state.weather.forecast);
  const error = useAppSelector((state) => state.weather.errorMessage);
  const showToast = () => {
    toast.error('City not found');
  };

  return (
    <>
      {/* {error && showToast}
      <ToastContainer /> */}
    </>
  );
};

export default ToastMessage;
