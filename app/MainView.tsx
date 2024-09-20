'use client'

import { useEffect, useLayoutEffect, useState } from 'react'
import { usePopularMovies } from './services/hooks/useMovies';
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { changePage } from './store/slices/movieSlice';
import MovieList from "./MovieList";
import Pagination from './Pagination';

type Prop = Readonly<{
  emptyComponent: React.ReactNode;
  movieSearchingComponent: React.ReactNode;
}>

function MainView({
  emptyComponent,
  movieSearchingComponent
}: Prop) {
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
    return <>{movieSearchingComponent}</>;
  } else if (isError) {
    return <>{emptyComponent}</>
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
      : <>{emptyComponent}</>
  }
}

export default MainView
