'use client'

import { useEffect } from 'react';
import { getPopularMovies} from 'store/slices/movieSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import PopularMovie from './PopularMovie';
import TopBarView from './TopBar/TopBarView';


function Home() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(state => state.movie.movies);
    
  useEffect(() => {
    dispatch(getPopularMovies())
  }, [dispatch])

  return (
    <div>
      <TopBarView />
      <div className="grid md:grid-cols-5 sm:grid-cols-4 auto-rows-auto gap-x-4 gap-y-8 pt-24 px-6 pb-5 overflow-auto justify-center">
        {
          movies.map((movie) => (
            <PopularMovie
              key={movie.id}
              movie={movie}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Home
