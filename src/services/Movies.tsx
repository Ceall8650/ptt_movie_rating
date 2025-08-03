import authFetch from './utilities/authFetch';
import { handleTmdbResponse } from './utilities/movie';
import type {
  ResponseMovie,
  FormattedResponseMovie,
  TmdbResponse,
  FormattedTmdbResponse,
} from './utilities/movie';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3/'


function getTmdbApi(path:string):string {
  return `${TMDB_BASE_URL}${path}`
}

export const popularMoviePath = 'movie/popular'
export const movieSearchPath = 'search/movie'
export const moviePath = 'movie'

export async function getPopularList(page = 1): Promise<FormattedTmdbResponse<FormattedResponseMovie>> {
  const response = await authFetch.get(getTmdbApi('movie/popular'), { page }) as TmdbResponse<ResponseMovie>

  return handleTmdbResponse(response)
}

export async function searchMovies(keyword: string, page = 1): Promise<FormattedTmdbResponse<FormattedResponseMovie>> {
  const response = await authFetch.get(getTmdbApi(`search/movie`), { 
    page,
    query: keyword
  }) as TmdbResponse<ResponseMovie>

  return handleTmdbResponse(response)
}

export async function getMovie(movieId: string, options?: RequestInit): Promise<ResponseMovie> {
  return authFetch.get(getTmdbApi(`movie/${movieId}`), options) as Promise<ResponseMovie>
}
