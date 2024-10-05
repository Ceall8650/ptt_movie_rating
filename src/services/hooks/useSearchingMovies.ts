import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@/store/hooks";
import { movieSearchPath, search } from "services/Movies";
import { mutateSearchResult, mutateMovieMode } from "@/store/slices/movieSlice";
import MovieMode from "enums/MovieMode";

type Options = {
	keyword: string;
	page?: number;
	enabled?: boolean;
	mode?: string;
};

export const useSearchingMovies = (
	options: Options = { page: 1, keyword: "", enabled: true, mode: "" }
) => {
	const dispatch = useAppDispatch();
	const { page, keyword, enabled, mode } = options;
	const query = useQuery({
		queryKey: [movieSearchPath, { page, keyword, mode }],
		enabled: enabled && !!keyword,
		queryFn: () => search(keyword, page),
	});
	const { isSuccess, data, isRefetching } = query;

	// Use useEffect to dispatch after rendering
	useEffect(() => {
		if (isSuccess && !isRefetching) {
			dispatch(mutateSearchResult({ ...data }));
			dispatch(mutateMovieMode({ mode: MovieMode.SEARCH }));
		}
	}, [isRefetching, isSuccess, data, dispatch]);

	return query;
};
