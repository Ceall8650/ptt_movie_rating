"use client";
import { useMemo } from "react";
import Image from "next/image";
import LikeImage from "assets/images/like.png";

type Props = Readonly<{
	title: string;
	reviews: Review[];
}>;

type ReviewMap = {
	goods: Review[];
	bads: Review[];
	normals: Review[];
	uncategorised: Review[];
};

function getReviewMap(reviews: Review[]): ReviewMap {
	const reviewMap: ReviewMap = {
		goods: [],
		bads: [],
		normals: [],
		uncategorised: [],
	};

	reviews.forEach((review) => {
		if (/好|爽|佳/.test(review.category?.join())) {
			reviewMap.goods.push(review);
		} else if (/爛|負/.test(review.category?.join())) {
			reviewMap.bads.push(review);
		} else if (/普/.test(review.category?.join())) {
			reviewMap.normals.push(review);
		} else {
			reviewMap.uncategorised.push(review);
		}
	});

	return reviewMap;
}
const RECOMMENDED_THRESHOLD = 70;


function MoviePosterTitle({ title, reviews }: Props) {
	const reviewMap = getReviewMap(reviews);
	const ratingRatio = useMemo(() => {
		if (!reviewMap) {
			return NaN;
		}
		const availableReviewAmount =
			reviewMap.goods.length + reviewMap.bads.length + reviewMap.normals.length;

		if (availableReviewAmount === 0) {
			return NaN;
		}

		return Math.round((reviewMap.goods.length / availableReviewAmount) * 100);
	}, [reviewMap]);

	const ImageComponent = ratingRatio >= RECOMMENDED_THRESHOLD && (
		<Image
			src={LikeImage}
			width={16}
			height={16}
			alt="like"
			className="inline-block mr-1 pt-[2px]"
		/>
	);
	return (
		<div className="text-sm flex items-start">
			{ImageComponent} {title} ({isNaN(ratingRatio) ? "-" : `${ratingRatio}%`})
		</div>
	);
}

export default MoviePosterTitle;
