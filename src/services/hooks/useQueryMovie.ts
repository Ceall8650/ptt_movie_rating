import { useSuspenseQuery } from "@tanstack/react-query";
import { getMovie, moviePath } from "services/Movies";

export const useQueryMovie = (id: string) => {
	return useSuspenseQuery({
		queryKey: [moviePath, id],
		queryFn: ({ signal }) => getMovie(id, { signal }),
	});
};
