'use client'

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getPopularMovies } from 'store/slices/movieSlice';
import MovieEmpty from "@/app/MovieEmpty";
import MovieList from "./MovieList";
import MovieSearching from "./MovieSearching";


function MainView() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movie.movies);

  useEffect(() => {
    dispatch(getPopularMovies());
  }, [dispatch]);

  let mainView = <MovieSearching />;

  if (movies) {
    mainView = movies.length ? <MovieList movies={movies} /> : <MovieEmpty />
  }


  return mainView
}

export default MainView

