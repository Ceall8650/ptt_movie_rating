import { useQuery, UndefinedInitialDataOptions } from '@tanstack/react-query';
import { useAppDispatch } from "store/hooks";
import authFetch from 'services/utilities/authFetch';
import { getTmdbApi } from 'services/utilities/apiPath';
import { handleTmdbResponse } from 'services/utilities/movie';
import { mutateSearchResult } from 'store/slices/movieSlice';
import { useEffect } from 'react';

const path = getTmdbApi('movie/popular')

async function getPopularList(page=1):Promise<FormattedTmdbResponse<FormattedResponseMovie>> {
  const response = await authFetch.get(path, { page }) as TmdbResponse<ResponseMovie>

  return handleTmdbResponse(response)
}

type Options = { 
  page?: number,
  enabled?: boolean
} 

function usePopularMovies(options?: Options) {
  const dispatch = useAppDispatch()
  const page = options?.page ?? 1
  const query = useQuery({
    queryKey: [path, page],
    queryFn:  () => getPopularList(page),
  })
  const { isSuccess, data } = query
  
  useEffect(() => {
    if(isSuccess) {
      dispatch(mutateSearchResult({ ...data }))
    }
  }, [dispatch, isSuccess, data])

  return query
}

export {
  getPopularList,
  usePopularMovies
}
