declare type TmdbResponse<T> = {
  page: number,
  results: T[],
  total_pages: number,
  total_results: number,
}

declare type FormattedTmdbResponse<T> = {
  page: number,
  movies: T[],
  totalPages: number,
  totalResults: number,
}
