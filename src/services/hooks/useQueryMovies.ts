import { useQuery } from "@tanstack/react-query";
import {
  popularMoviePath,
  getPopularList,
} from 'services/Movies'

type Options = {
	page?: number;
	enabled?: boolean;
	mode?: string;
};

export const useQueryMovies = (
	options: Options = { page: 1, enabled: true, mode: "" }
) => {
	const { page, enabled, mode } = options;

	return useQuery({
		enabled,
		queryKey: [popularMoviePath, page, mode],
    queryFn: () => getPopularList(page),
	});
};
