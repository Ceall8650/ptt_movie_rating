"use client";

import { useEffect, useState } from "react";
import { useQueryMovieReviews } from "services/hooks/useQueryMovieReviews";
import MoviePosterTitle from "./MoviePosterTitle";
import MoviePosterImage from "./MoviePosterImage";

type Props = {
	readonly movie: FormattedResponseMovie;
};

function MoviePoster({ movie }: Props) {
	const [reviews, setReviews] = useState<Review[]>([]);
	const { data, isLoading, isError } = useQueryMovieReviews(movie.title);

	useEffect(() => {
		if (!isLoading && !isError && data) {
			setReviews(data);
		}
	}, [data, isLoading, isError])

	return (
		<div
			className={`
					flex
          flex-col
          items-center 
        `}
		>
			<MoviePosterImage movie={movie} />
			<MoviePosterTitle title={movie.title} reviews={reviews} />
		</div>
	);
}

export default MoviePoster;
