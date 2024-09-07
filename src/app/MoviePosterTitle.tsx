"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import REVIEW from "services/Review";
import Image from "next/image";
import LikeImage from "assets/images/like.png";

type Props = Readonly<{
	title: string;
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

function MoviePoster({ title }: Props) {
	const RECOMMENDED_THRESHOLD = 70;
	const [reviewMap, setReviewMap] = useState<null | ReviewMap>(null);
	const fetchReviews = useCallback(async () => {
		const reviews = await REVIEW.getAll(title);

		setReviewMap(getReviewMap(reviews));
	}, [title]);
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

	useEffect(() => {
		fetchReviews();
	}, [fetchReviews]);

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

export default MoviePoster;
