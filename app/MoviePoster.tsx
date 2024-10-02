"use client";

import { useEffect, useState } from "react";
import REVIEW from "./services/Review";
import MoviePosterTitle from "./MoviePosterTitle";
import MoviePosterImage from "./MoviePosterImage";

type Props = {
	readonly movie: FormattedResponseMovie;
};

function MoviePoster({ movie }: Props) {
	const [reviews, setReviews] = useState<Review[]>([]);

	useEffect(() => {
		let ignore = false

		async function fetchReviews() {
			const reviews = await REVIEW.getAll(movie.title);
			if (ignore) return
			setReviews(reviews);
		}
		fetchReviews();

		return () => {
			ignore = true
		}
	}, [movie.title]);

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
