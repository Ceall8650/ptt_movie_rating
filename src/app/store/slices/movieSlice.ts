import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'store/index';
import Movies from 'services/Movies';

type movieState = {
  movies: FormattedResponseMovie[]|null,
  keyword: string,
  totalResults: number,
  value: number
}

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
  }
})

export const { 
  mutateSearchResult, 
  mutateKeyword,
} = movieSlice.actions

export const getPopularMovies = () => async (dispatch: AppDispatch) => {
  const { movies, totalResults } = await Movies.getPopularList();
  dispatch(mutateSearchResult({ movies, totalResults }))
}

export const searchMovies = (keyword:string) => async (dispatch: AppDispatch) => {
  dispatch(mutateSearchResult({ movies: null, totalResults: 0 }))
  
  const { movies, totalResults } = await Movies.search(keyword)
  
  dispatch(mutateSearchResult({ movies, totalResults }))
}

export default movieSlice.reducer
