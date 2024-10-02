import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import MovieMode from '../../enums/MovieMode';

type movieState = {
  mode: MovieMode,
  movies: FormattedResponseMovie[]|null,
  totalPages: number,
  currentPage: number,
  
}

const initialState: movieState = {
  mode: MovieMode.POPULAR,
  movies: null,
  totalPages: 0,
  currentPage: 1,
}

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    mutateMovieMode(state, action:PayloadAction<{ mode: MovieMode }>) {
      state.mode = action.payload.mode
    },
    mutateSearchResult(state, action:PayloadAction<{ movies: FormattedResponseMovie[]|null, totalPages:number }>) {
      state.movies = action.payload.movies
      state.totalPages = action.payload.totalPages
    },
    changePage(state, action:PayloadAction<{ pageNumber:number }>) {
      state.currentPage = action.payload.pageNumber
    },
  },
})

export const { 
  mutateMovieMode,
  mutateSearchResult,
  changePage,
} = movieSlice.actions

export default movieSlice.reducer
