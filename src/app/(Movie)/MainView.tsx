'use client'

import { useEffect } from 'react'
import {
  popularMoviePath,
  movieSearchPath,
  getPopularList,
} from 'services/Movies'
import {
  mutateSearchResult,
  changePage
} from '@/store/slices/movieSlice';
import { useQuery, useIsFetching } from '@tanstack/react-query'
import MovieMode from 'enums/MovieMode';
import { useAppDispatch, useAppSelector } from "store/hooks";
import Pagination from 'app/Pagination';
import MovieList from "./MovieList";

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
  const totalPages = useAppSelector(state => state.movie.totalPages)
  const keyword = useAppSelector(state => state.movie.keyword)
  const isMovieSearching = useIsFetching({ queryKey: [movieSearchPath, { page: currentPage, keyword, mode }] })
  const { isSuccess, data, isLoading, isError } = useQuery({
    enabled: mode === MovieMode.POPULAR,
    queryKey: [popularMoviePath, currentPage, mode],
    queryFn: () => getPopularList(currentPage),
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
