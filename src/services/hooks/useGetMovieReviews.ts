import { useQuery } from "@tanstack/react-query";
import REVIEW, { reviewPath } from "services/Review";

export const useGetMovieReviews = (movieTitle: string) => {
	return useQuery({
		queryKey: [reviewPath, movieTitle],
		queryFn: ({ signal }) => REVIEW.getAll(movieTitle, { signal }),
	});
};
