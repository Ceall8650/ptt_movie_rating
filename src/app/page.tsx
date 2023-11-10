'use client'

import { useEffect } from 'react';
import { getPopularMovies} from 'store/slices/movieSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import EmptyResult from 'app/EmptyResult';
import PopularMovie from './PopularMovie';
import TopBarView from './TopBar/TopBarView';

function Home() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(state => state.movie.movies);
    
  useEffect(() => {
    dispatch(getPopularMovies())
  }, [dispatch])

  return (
    <div className="h-full">
      <TopBarView />
      {
        movies.length 
        ? <div className="grid md:grid-cols-5 sm:grid-cols-4 auto-rows-auto gap-x-4 gap-y-8 pt-24 px-6 pb-5 overflow-auto justify-center">
            {
              movies.map((movie) => (
                  <PopularMovie
                    key={movie.id}
                    movie={movie}
                  />
                ))
            }
          </div>
        : <EmptyResult className="pt-24" />
      }
    </div>
  )
}

export default Home
