"use client";

import { usePopularMovies } from 'services/hooks/useMovies';
import TopBarSearchBar from "./TopBarSearchBar";
import TopBarThemeModeButton from "./TopBarThemeModeButton";

type Props = Readonly<{
	className?: string;
}>;

function TopBarView({ className }: Props) {
	const { refetch } = usePopularMovies()
	const rootClassName = `fixed top-0 left-0 z-topBar w-full bg-white dark:bg-dark-mode-primary flex justify-between px-6 py-4 drop-shadow-lg`;

	return (
		<div
			className={
				className ? ` ${className} ${rootClassName} bg-blue-950` : rootClassName
			}
		>
			<h1 className="text-xl">鄉民溫度計 - 電影版</h1>
			<ul className="flex flex-auto pl-20">
				<li className="flex items-center cursor-pointer">
					<button onClick={() => refetch()}>Popular</button>
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
