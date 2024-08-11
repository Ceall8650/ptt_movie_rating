import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from "store/hooks";
import {
  popularMoviePath,
  movieSearchPath,
  getPopularList,
  search
} from 'services/Movies'
import { mutateSearchResult } from 'store/slices/movieSlice';

type Options = {
  keyword?: string, 
  page?: number,
  enabled?: boolean
} 

function usePopularMovies(options?: Options) {
  const dispatch = useAppDispatch()
  const page = options?.page ?? 1
  const enabled = options?.enabled 
  const query = useQuery({
    queryKey: [popularMoviePath, page],
    enabled,
    queryFn: () => getPopularList(page),
  })
  const { isSuccess, data, isFetching, isRefetching } = query

  // Use useEffect to dispatch after rendering
  useEffect(() => {
    if (!isFetching && !isRefetching && isSuccess) {
      dispatch(mutateSearchResult({ ...data }));
    }
  }, [isFetching, isRefetching, isSuccess, data, dispatch]);

  return query
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
    if (!isRefetching && isSuccess) {
      dispatch(mutateSearchResult({ ...data }));
    }
  }, [isRefetching, isSuccess, data, dispatch]);

  return query
}

export {
  usePopularMovies,
  useSearchingMovies
}
