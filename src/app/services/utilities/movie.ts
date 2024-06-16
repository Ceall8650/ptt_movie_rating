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
