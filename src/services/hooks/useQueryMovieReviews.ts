import { useQuery } from "@tanstack/react-query";
import REVIEW, { reviewPath } from "services/Review";

export function getQueryKey(movieTitle: string) {
	return [reviewPath, movieTitle];
}

export const useQueryMovieReviews = (movieTitle: string) => {
	const queryKey = getQueryKey(movieTitle);

	return {
		...useQuery({
			queryKey,
			queryFn: ({ signal }) => REVIEW.getAll(movieTitle, { signal }),
		}),
		queryKey,
	};
};
