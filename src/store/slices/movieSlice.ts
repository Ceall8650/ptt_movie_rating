import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import MovieMode from '../../enums/MovieMode';

type movieState = {
  mode: MovieMode,
  movies: FormattedResponseMovie[]|null,
  totalPages: number,
  currentPage: number,
  keyword: string,
}

const initialState: movieState = {
  mode: MovieMode.POPULAR,
  movies: null,
  totalPages: 0,
  currentPage: 1,
  keyword: '',
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
    mutateKeyword(state, action:PayloadAction<{ keyword: string }>) {
      state.keyword = action.payload.keyword
    },
  },  
})

export const { 
  mutateMovieMode,
  mutateSearchResult,
  mutateKeyword,
  changePage,
} = movieSlice.actions

export default movieSlice.reducer
