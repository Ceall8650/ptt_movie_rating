import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'store/index';
import {
  search
} from 'services/Movies';

type movieState = {
  movies: FormattedResponseMovie[]|null,
  keyword: string,
  totalResults: number,
  value: number
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
  keyword: '',
  totalResults: 0,
  value: 0,
}

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    mutateKeyword(state,action:PayloadAction<string> ) {
      state.keyword = action.payload
    },
    mutateSearchResult(state, action:PayloadAction<{ movies: FormattedResponseMovie[]|null, totalResults:number }>) {
      state.movies = action.payload.movies
      state.totalResults = action.payload.totalResults
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.fulfilled, (state, action: PayloadAction<{ movies: FormattedResponseMovie[]|null, totalResults:number }>) => {
        const { movies, totalResults } = action.payload

        state.movies = movies
        state.totalResults = totalResults
      })
  }
})

export const { 
  mutateSearchResult, 
  mutateKeyword,
} = movieSlice.actions

export default movieSlice.reducer
