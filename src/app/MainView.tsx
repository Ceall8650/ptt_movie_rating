'use client'

import { usePopularMovies } from 'services/hooks/usePopularMovies';
import MovieEmpty from "@/app/MovieEmpty";
import { useAppSelector } from "store/hooks";
import MovieList from "./MovieList";
import MovieSearching from "./MovieSearching";


function MainView() {
  const { isLoading, isRefetching, isError } = usePopularMovies()
  const movies = useAppSelector(state => state.movie.movies)

  if (isLoading || isRefetching) {
    return <MovieSearching />;
  } else if (isError) {
    return <MovieEmpty />
  } else {
    return movies?.length ? <MovieList movies={movies} /> : <MovieEmpty />
  }
}

export default MainView

