import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type movieState = {
  movies: FormattedResponseMovie[]|null,
  totalPages: number,
}

const initialState: movieState = {
  movies: null,
  totalPages: 0,
}

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    mutateSearchResult(state, action:PayloadAction<{ movies: FormattedResponseMovie[]|null, totalPages:number }>) {
      state.movies = action.payload.movies
      state.totalPages = action.payload.totalPages
    },
  },
})

export const { 
  mutateSearchResult, 
} = movieSlice.actions

export default movieSlice.reducer
