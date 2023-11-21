'use client'

import { useAppSelector } from 'store/hooks';
import MoviePoster from './MoviePoster';

type Props = {
  movies: FormattedResponseMovie[]
}

function MovieList({ movies }: Props) {
  const keyword = useAppSelector(state => state.movie.keyword)
  const totalResults = useAppSelector(state => state.movie.totalResults)

  return (
    <div className='pt-24'>
      {
        keyword && 
        <div className='mb-3 px-6'>
          Here are the movies the name contains <b className=''>{keyword}</b>. 
          Total <b>{totalResults}</b> results
          Back to <button className='link'>Popular List</button>
        </div>
      }
      <div className="grid md:grid-cols-5 sm:grid-cols-4 auto-rows-auto gap-x-4 gap-y-8 px-6 pb-5 overflow-auto justify-center">
        {
          movies.map((movie) => (
              <MoviePoster
                key={movie.id}
                movie={movie}
              />
            ))
        }
      </div>
    </div>
  )
}

export default MovieList
