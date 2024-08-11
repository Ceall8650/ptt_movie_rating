'use client'

import { useEffect, useState } from 'react'
import { usePopularMovies } from 'services/hooks/useMovies';
import MovieEmpty from "@/app/MovieEmpty";
import { useAppSelector } from "store/hooks";
import MovieList from "./MovieList";
import MovieSearching from "./MovieSearching";


function MainView() {
  const [isFetchEnabled, setIsFetchEnabled] = useState(true)
  const { isLoading, isRefetching, isError, isFetched } = usePopularMovies({ enabled: isFetchEnabled })
  const movies = useAppSelector(state => state.movie.movies)

  useEffect(() => {
    if (isFetched) { // Check if mounted before updating state
      setIsFetchEnabled(false)
    }
  }, [isFetched])

  if (isLoading || isRefetching) {
    return <MovieSearching />;
  } else if (isError) {
    return <MovieEmpty />
  } else {
    return movies?.length ? <MovieList movies={movies} /> : <MovieEmpty />
  }
}

export default MainView
