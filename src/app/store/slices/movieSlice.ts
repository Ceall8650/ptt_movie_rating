import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type movieState = {
  movies: FormattedResponseMovie[]|null,
  totalResults: number,
}

const initialState: movieState = {
  movies: null,
  totalResults: 0,
}

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    mutateSearchResult(state, action:PayloadAction<{ movies: FormattedResponseMovie[]|null, totalResults:number }>) {
      state.movies = action.payload.movies
      state.totalResults = action.payload.totalResults
    },
  },
})

export const { 
  mutateSearchResult, 
} = movieSlice.actions

export default movieSlice.reducer
