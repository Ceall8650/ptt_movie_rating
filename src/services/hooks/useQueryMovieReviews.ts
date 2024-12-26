import { useQuery } from "@tanstack/react-query";
import REVIEW, { reviewPath } from "services/Review";

export const useQueryMovieReviews = (movieTitle: string) => {
	return useQuery({
		queryKey: [reviewPath, movieTitle],
		queryFn: ({ signal }) => REVIEW.getAll(movieTitle, { signal }),
	});
};
