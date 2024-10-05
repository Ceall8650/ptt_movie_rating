import { useQuery } from "@tanstack/react-query";
import { movieSearchPath, search } from "services/Movies";

type Options = {
	keyword: string;
	page?: number;
	enabled?: boolean;
	mode?: string;
};

export const useSearchingMovies = (
	options: Options = { page: 1, keyword: "", enabled: true, mode: "" }
) => {
	const { page, keyword, enabled, mode } = options;
	return useQuery({
		queryKey: [movieSearchPath, { page, keyword, mode }],
		enabled: enabled && !!keyword,
		queryFn: () => search(keyword, page),
	});
};
