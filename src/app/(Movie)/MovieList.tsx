import MoviePoster from "./(Poster)/MoviePoster";

type Props = Readonly<{
	movies: FormattedResponseMovie[];
}>;

function MovieList({ movies }: Props) {
	return (
		<div className="grid md:grid-cols-md-poster sm:grid-cols-sm-poster auto-rows-poster gap-x-4 gap-y-8 justify-around overflow-x-auto">
			{movies.map((movie) => (
				<MoviePoster
					key={movie.id}
					movie={movie}
				/>
			))}
		</div>
	);
}

export default MovieList;
