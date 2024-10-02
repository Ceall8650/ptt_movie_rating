export const TMDB_BASE_URL = 'https://api.themoviedb.org/3/'
export function getTmdbApi(path:string):string {
  return `${TMDB_BASE_URL}${path}`
}
