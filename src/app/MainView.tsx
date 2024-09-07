'use client'

import { useEffect, useState } from 'react'
import { usePopularMovies } from 'services/hooks/useMovies';
import MovieEmpty from "@/app/MovieEmpty";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { changePage } from 'store/slices/movieSlice';
import MovieList from "./MovieList";
import MovieSearching from "./MovieSearching";
import Pagination from './Pagination';


function MainView() {
  const [isFetchEnabled, setIsFetchEnabled] = useState(true)
  const currentPage = useAppSelector(state => state.movie.currentPage)
  const { isLoading, isRefetching, isError, isFetched } = usePopularMovies({
    enabled: isFetchEnabled,
    page: currentPage
  })
  const dispatch = useAppDispatch()
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
        <footer className="flex justify-center">
          <Pagination
            total={totalPages}
            className="w-[600px]"
            currentPage={currentPage}
            changePage={(page: number) => dispatch(changePage({ pageNumber: page }))}
          />
        </footer>
      </div>
      : <MovieEmpty />
  }
}

export default MainView
