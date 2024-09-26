import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from "store/hooks";
import {
  movieSearchPath,
  search
} from '../Movies'
import { 
  mutateSearchResult, 
  mutateMovieMode 
} from 'store/slices/movieSlice';
import MovieMode from 'enums/MovieMode';

type Options = {
  keyword?: string, 
  page?: number,
  enabled?: boolean
} 

function useSearchingMovies(options?: Options) {
  const dispatch = useAppDispatch()
  const page = options?.page ?? 1
  const keyword = options?.keyword ?? ''
  const enabled = options?.enabled ?? true
  const query = useQuery({
    queryKey: [movieSearchPath, page, keyword],
    enabled: enabled && !!keyword,
    queryFn: () => search(keyword, page),
  })
  const { isSuccess, data, isRefetching } = query

  // Use useEffect to dispatch after rendering
  useEffect(() => {
    if (isSuccess && !isRefetching) {
      dispatch(mutateSearchResult({ ...data }));
      dispatch(mutateMovieMode({ mode: MovieMode.SEARCH }))
    }
  }, [isRefetching, isSuccess, data, dispatch]);

  return query
}

export {
  useSearchingMovies
}
