"use client";

import { useAppDispatch, useAppSelector } from "store/hooks";
import MovieMode from 'enums/MovieMode';
import { changePage, mutateSearchResult, mutateMovieMode } from 'store/slices/movieSlice';
import {
	popularMoviePath,
	getPopularList,
} from 'services/Movies'
import { queryClient } from '../Providers';
import TopBarSearchBar from "./TopBarSearchBar";
import TopBarThemeModeButton from "./TopBarThemeModeButton";

type Props = Readonly<{
	className?: string;
}>;

function TopBarView({ className }: Props) {
	const dispatch = useAppDispatch()
	const mode = useAppSelector(state => state.movie.mode)
	const rootClassName = `fixed top-0 left-0 z-topBar w-full bg-white dark:bg-dark-mode-primary flex justify-between px-6 py-4 drop-shadow-lg`;

	async function getPopularMovies() {
		try {
			const DEFAULT_PAGE = 1
			// Fetch data from the query client and return the cached data if it exists
			const data = await queryClient.fetchQuery({
				queryKey: [popularMoviePath, DEFAULT_PAGE],
				queryFn: () => getPopularList(DEFAULT_PAGE)
			})

			dispatch(mutateMovieMode({ mode: MovieMode.POPULAR }))
			dispatch(mutateSearchResult({ ...data }))
			dispatch(changePage({ pageNumber: DEFAULT_PAGE }))
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div
			className={
				className ? ` ${className} ${rootClassName} bg-blue-950` : rootClassName
			}
		>
			<h1 className="text-xl">鄉民溫度計 - 電影版</h1>
			<ul className="flex flex-auto pl-20">
				<li className="flex items-center cursor-pointer">
					<button onClick={getPopularMovies}>Popular</button>
				</li>
			</ul>
			<div className="flex items-center">
				<TopBarSearchBar className="mr-5" />
				<TopBarThemeModeButton />
			</div>
		</div>
	);
}

export default TopBarView;
