'use client'

import { useEffect, useState } from 'react'
import { usePopularMovies } from 'services/hooks/useMovies';
import MovieEmpty from "@/app/MovieEmpty";
import { useAppSelector } from "store/hooks";
import MovieList from "./MovieList";
import MovieSearching from "./MovieSearching";
import Pagination from './Pagination';


function MainView() {
  const [isFetchEnabled, setIsFetchEnabled] = useState(true)
  const { isLoading, isRefetching, isError, isFetched } = usePopularMovies({
    enabled: isFetchEnabled,
    page: 1
  })
  const movies = useAppSelector(state => state.movie.movies)
  const totalPages = useAppSelector(state => state.movie.totalPages)

  useEffect(() => {
    if (isFetched) { // Check if the API have been fetched
      setIsFetchEnabled(false)
    }
  }, [isFetched])

  if (isLoading || isRefetching) {
    return <MovieSearching />;
  } else if (isError) {
    return <MovieEmpty />
  } else {
    return movies?.length
      ? <div>
        <MovieList movies={movies} />
        <Pagination total={totalPages} />
      </div>
      : <MovieEmpty />
  }
}

export default MainView
