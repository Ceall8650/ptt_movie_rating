"use client";

import { useEffect } from "react";
import { getPopularMovies } from "store/slices/movieSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import MovieEmpty from "@/app/MovieEmpty";
import TopBarView from "./TopBar/TopBarView";
import MovieList from "./MovieList";
import MovieSearching from "./MovieSearching";

function Home() {
	const dispatch = useAppDispatch();
	const movies = useAppSelector((state) => state.movie.movies);

	useEffect(() => {
		dispatch(getPopularMovies());
	}, [dispatch]);

	return (
		<div className="h-full overflow-auto">
			<TopBarView />
			{movies ? (
				movies.length ? (
					<MovieList movies={movies} />
				) : (
					<MovieEmpty />
				)
			) : (
				<MovieSearching />
			)}
		</div>
	);
}

export default Home;
