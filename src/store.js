import { configureStore } from '@reduxjs/toolkit';
import greetReducer from './greetReducer';

const store = configureStore({
  reducer: {
    greet: greetReducer,
  },
});

export default store;
