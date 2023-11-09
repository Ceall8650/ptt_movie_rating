import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';

const store = configureStore({
  reducer: {
    movie: movieReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store

