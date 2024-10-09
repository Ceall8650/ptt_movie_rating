"use client";

import Image from "next/image";
import MovieDefaultPoster from "assets/images/movieDefaultPoster.svg";
import { getImageUrl } from "../../../common/utilities";

type Props = {
	readonly movie: FormattedResponseMovie;
};

function MoviePosterImage({ movie }: Props) {
	const imageSource = movie.posterPath
		? getImageUrl(movie.posterPath)
		: MovieDefaultPoster;

	return (
		<div className="w-full h-[270px] relative mb-2 hover:cursor-pointer group">
			<Image
				src={imageSource}
				sizes="100vw"
				style={{ width: "100%", height: "100%" }} // optional
				alt={`Movie Poster: ${movie.originalTitle}`}
				fill
				className="
				group-hover:blur-[1px]
				group-hover:brightness-50
			"
				priority
			/>
			<div
				className="
				absolute
				top-1/2 
				left-1/2 
				text-2xl
				translate-y-[-50%] 
				translate-x-[-50%]
				hidden
				group-hover:inline-block
				text-white
			"
			>
				<div className="flex flex-col items-center justify-center">
					<i className="icon-comment mb-2" />
					<span className="text-sm">查詢評價</span>
				</div>
			</div>
		</div>
	);
}

export default MoviePosterImage;
