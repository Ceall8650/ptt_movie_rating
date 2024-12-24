'use client'

import { useEffect } from 'react'
import { useIsFetching } from '@tanstack/react-query'
import { movieSearchPath } from 'services/Movies'
import { mutateSearchResult } from '@/store/slices/movieSlice';
import MovieMode from 'enums/MovieMode';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useGetMovies } from 'services/hooks/useGetMovie'
import MovieList from "./MovieList";
import MovieFooter from './MovieFooter';
type Prop = Readonly<{
  emptyComponent: React.ReactNode;
  movieSearchingComponent: React.ReactNode;
}>

function MainView({
  emptyComponent,
  movieSearchingComponent
}: Prop) {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(state => state.movie.currentPage)
  const movies = useAppSelector(state => state.movie.movies)
  const mode = useAppSelector(state => state.movie.mode)
  const keyword = useAppSelector(state => state.movie.keyword)
  const isMovieSearching = useIsFetching({ queryKey: [movieSearchPath, { page: currentPage, keyword, mode }] })
  const { isSuccess, data, isLoading, isError } = useGetMovies({
    page: currentPage,
    mode,
    enabled: mode === MovieMode.POPULAR,
  })

  // Use useEffect to dispatch after rendering
  // Must put the dispatch in the useEffect to prevent the MainView re-render while MainView is rendering
  // app-index.js:31 Warning: Cannot update a component (`MainView`) while rendering a different component (`TopBarView`). To locate the bad setState() call inside `TopBarView`
  useEffect(() => {
    if (isSuccess && mode === MovieMode.POPULAR) {
      dispatch(mutateSearchResult({ ...data }));
    }
  }, [isSuccess, data, mode, dispatch])

  if (isLoading || isMovieSearching) {
    return <>{movieSearchingComponent}</>;
  } else if (isError) {
    return <>{emptyComponent}</>
  } else {
    return movies?.length
      ? <>
        <MovieList movies={movies} />
        <MovieFooter />
      </>
      : <>{emptyComponent}</>
  }
}

export default MainView
