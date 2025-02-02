import { useQuery } from "@tanstack/react-query";
import { getMovie, moviePath } from "services/Movies";

export const useQueryMovie = (id: string) => {
	return useQuery({
		queryKey: [moviePath, id],
		queryFn: ({ signal }) => getMovie(id, { signal }),
	});
};
