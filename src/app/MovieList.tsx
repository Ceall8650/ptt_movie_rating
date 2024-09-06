import MoviePoster from "./MoviePoster";

type Props = Readonly<{
	className?: String,
	movies: FormattedResponseMovie[];
}>;

function MovieList({ movies, className }: Props) {
	let rootClass = "grid md:grid-cols-5 sm:grid-cols-4 auto-rows-auto pt-24 gap-x-4 gap-y-8 px-6 pb-5 justify-center"

	if (className) {
		rootClass = `${rootClass} ${className}`
	}

	return (
		<div className={rootClass}>
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
