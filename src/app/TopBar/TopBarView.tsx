"use client";

import { useAppDispatch } from "store/hooks";
import { usePopularMovies } from 'services/hooks/usePopularMovies';
import TopBarSearchBar from "./TopBarSearchBar";
import TopBarThemeModeButton from "./TopBarThemeModeButton";

type Props = {
	className?: string;
};

function TopBarView({ className }: Props) {
	const { refetch } = usePopularMovies()
	const rootClassName = `fixed top-0 left-0 z-topBar w-full bg-white dark:bg-dark-mode-primary flex justify-between px-6 py-4 drop-shadow-lg`;

	function handlePopularClick() {
		refetch()
	}

	return (
		<div
			className={
				className ? ` ${className} ${rootClassName} bg-blue-950` : rootClassName
			}
		>
			<h1 className="text-xl">鄉民溫度計 - 電影版</h1>
			<ul className="flex flex-auto pl-20">
				<li
					className="flex items-center cursor-pointer"
					onClick={handlePopularClick}
				>
					Popular
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
