export type ResponseMovie = {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}
export type FormattedResponseMovie = {
  adult: boolean,
  backdropPath: string,
  genreIds: number[],
  id: number,
  originalLanguage: string,
  originalTitle: string,
  overview: string,
  popularity: number,
  posterPath: string,
  releaseDate: string,
  title: string,
  video: boolean,
  voteAverage: number,
  voteCount: number
}
export type TmdbResponse<T> = {
  page: number,
  results: T[],
  total_pages: number,
  total_results: number,
}

export type FormattedTmdbResponse<T> = {
  page: number,
  movies: T[],
  totalPages: number,
  totalResults: number,
}

export function handleMovieFormat(movie:ResponseMovie): FormattedResponseMovie {
  return {
    adult: movie.adult,
    backdropPath: movie.backdrop_path,
    genreIds: movie.genre_ids,
    id: movie.id,
    originalLanguage: movie.original_language,
    originalTitle: movie.original_title,
    overview: movie.overview,
    popularity: movie.popularity,
    posterPath: movie.poster_path,
    releaseDate: movie.release_date,
    title: movie.title,
    video: movie.video,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
  }
}

export function handleTmdbResponse(response:TmdbResponse<ResponseMovie>):FormattedTmdbResponse<FormattedResponseMovie> {
  return {
    page: response.page,
    movies: response.results.map(movie => handleMovieFormat(movie)),
    totalPages: response.total_pages,
    totalResults: response.total_results
  }
}
