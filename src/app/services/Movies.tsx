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

function handleMovieResponse(movie:ResponseMovie):FormattedResponseMovie {
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

const Movies = {
  async getPopularList():Promise<FormattedResponseMovie[]> {
    const { results } = await authFetch.get(getTmdbApi('movie/popular'), { page: 1 }) as TmdbResponse<ResponseMovie>

    return results.map(movie => handleMovieResponse(movie))
  },
  async search(keyword: string):Promise<FormattedResponseMovie[]> {
    const { results } = await authFetch.get(getTmdbApi(`search/movie`), { 
      page: 1,
      query: keyword
    }) as TmdbResponse<ResponseMovie>

    return results.map(movie => handleMovieResponse(movie))
  }
}

export default Movies
