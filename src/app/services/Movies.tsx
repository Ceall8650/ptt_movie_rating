import authFetch from './utilities/authFetch';

type ResponseMovie = {
  "adult": boolean,
  "backdrop_path": string,
  "genre_ids": number[],
  "id": number,
  "original_language": string,
  "original_title": string,
  "overview": string,
  "popularity": number,
  "poster_path": string,
  "release_date": string,
  "title": string,
  "video": false,
  "vote_average": number,
  "vote_count": number
}

const TMDB_BASE_URL = 'https://api.themoviedb.org/3/'

function getTmdbApi(path:string):string {
  return `${TMDB_BASE_URL}${path}`
}

function handleMovieFormat(movie:ResponseMovie): FormattedResponseMovie {
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

function handleTmdbResponse(response:TmdbResponse<ResponseMovie>):FormattedTmdbResponse<FormattedResponseMovie> {
  return {
    page: response.page,
    movies: response.results.map(movie => handleMovieFormat(movie)),
    totalPages: response.total_pages,
    totalResults: response.total_results
  }
}

const Movies = {
  async getPopularList():Promise<FormattedTmdbResponse<FormattedResponseMovie>> {
    const response = await authFetch.get(getTmdbApi('movie/popular'), { page: 1 }) as TmdbResponse<ResponseMovie>

    return handleTmdbResponse(response)
  },
  async search(keyword: string):Promise<FormattedTmdbResponse<FormattedResponseMovie>> {
    const response = await authFetch.get(getTmdbApi(`search/movie`), { 
      page: 1,
      query: keyword
    }) as TmdbResponse<ResponseMovie>

    return handleTmdbResponse(response)
  }
}

export default Movies
