"use client";

import { useAppDispatch } from "store/hooks";
import { usePathname, useRouter } from 'next/navigation'
import MovieMode from 'enums/MovieMode';
import { changePage, mutateMovieMode } from 'store/slices/movieSlice';
import TopBarSearchBar from "./TopBarSearchBar";
import TopBarThemeModeButton from "./TopBarThemeModeButton";

type Props = Readonly<{
	className?: string;
}>;

function TopBarView({ className }: Props) {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const pathname = usePathname()
	const rootClassName = `w-full bg-white dark:bg-dark-mode-primary flex justify-between px-6 py-4 drop-shadow-lg`;

	function getPopularMovies() {
		dispatch(mutateMovieMode({ mode: MovieMode.POPULAR }))
		dispatch(changePage({ pageNumber: 1 }))
		if (pathname !== '/') {
			router.push('/')
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
