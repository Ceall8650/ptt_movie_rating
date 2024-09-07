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
  const query = useQuery({
    queryKey: [popularMoviePath, page],
    queryFn: () => getPopularList(page),
  })
  const { isSuccess, data } = query
  // Use useEffect to dispatch after rendering

  // Must put the dispatch in the useEffect to prevent the MainView re-render while MainView is rendering
  // app-index.js:31 Warning: Cannot update a component (`MainView`) while rendering a different component (`TopBarView`). To locate the bad setState() call inside `TopBarView`
  useEffect(() => {    
    if(isSuccess) {
      dispatch(mutateSearchResult({ ...data }));
    }
  }, [isSuccess, data, dispatch])

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
