import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'store/index';
import Movies from 'services/Movies';

type movieState = {
  movies: FormattedResponseMovie[],
  value: number
}

const initialState: movieState = {
  movies:[],
  value: 0,
}

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies(state, action:PayloadAction<FormattedResponseMovie[]>) {
      state.movies = action.payload
    },
  }
})

export const { setMovies } = movieSlice.actions

export const getPopularMovies = () => async (dispatch: AppDispatch) => {
  const movies = await Movies.getPopularList();
  dispatch(setMovies(movies))
}

export const searchMovies = (keyword:string) => async (dispatch: AppDispatch) => {
  const searchedMovies = await Movies.search(keyword)
  
  dispatch(setMovies(searchedMovies))
}

export default movieSlice.reducer
