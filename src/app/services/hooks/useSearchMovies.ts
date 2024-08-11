import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from "store/hooks";
import authFetch from 'services/utilities/authFetch';
import { getTmdbApi } from 'services/utilities/apiPath';
import { handleTmdbResponse } from 'services/utilities/movie';
import { mutateSearchResult } from 'store/slices/movieSlice';
import { useEffect } from 'react';

const path = getTmdbApi('search/movie')

async function getSearchList(keyword: string, page=1):Promise<FormattedTmdbResponse<FormattedResponseMovie>> {
  const response = await authFetch.get(path, { 
    page, 
    query: keyword 
  }) as TmdbResponse<ResponseMovie>

  return handleTmdbResponse(response)
}

function useSearchMovies(keyword: string, page=1) {
  const dispatch = useAppDispatch()
  const query = useQuery({
    queryKey: [path],
    queryFn:  () => getSearchList(keyword, page)
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
  getSearchList,
  useSearchMovies
}
