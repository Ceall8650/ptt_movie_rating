import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'store/index';
import {
  search
} from 'services/Movies';

type movieState = {
  movies: FormattedResponseMovie[]|null,
}

export const searchMovies = createAsyncThunk<
  FormattedTmdbResponse<FormattedResponseMovie>,
  string,
  { dispatch: AppDispatch }
>(
  "movie/searchMovies",
  async (keyword:string, { dispatch } ) => {
    dispatch(mutateSearchResult({ movies: null, totalResults: 0 }))

    return search(keyword)
  }
)

const initialState: movieState = {
  movies: null,
}

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    mutateSearchResult(state, action:PayloadAction<{ movies: FormattedResponseMovie[]|null, totalResults:number }>) {
      console.log('action.payload.movies :>> ', action.payload.movies);
      state.movies = action.payload.movies
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.fulfilled, (state, action: PayloadAction<{ movies: FormattedResponseMovie[]|null, totalResults:number }>) => {
        const { movies } = action.payload

        state.movies = movies
      })
  }
})

export const { 
  mutateSearchResult, 
} = movieSlice.actions

export default movieSlice.reducer
