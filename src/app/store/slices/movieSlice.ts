import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type movieState = {
  movies: FormattedResponseMovie[]|null,
  totalPages: number,
  currentPage: number,
  
}

const initialState: movieState = {
  movies: null,
  totalPages: 0,
  currentPage: 1,
}

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
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
  mutateSearchResult,
  changePage,
} = movieSlice.actions

export default movieSlice.reducer
