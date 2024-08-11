import ModalBase from "components/Modal/ModalBase";
import Image from "next/image";

type Props = {
	movie: FormattedResponseMovie;
	imageSource: string;
	onClose: Function;
};

function MovieDetailModal({ onClose, movie, imageSource }: Props) {
	return (
		<ModalBase
			id="movie-detail-modal"
			width={800}
			height={450}
			onClose={onClose}
		>
			<Image
				src={imageSource}
				width={0}
				height={0}
				sizes="100vw"
				style={{ width: "40%", height: "450px" }} // optional
				alt="Movie Poster"
			/>
		</ModalBase>
	);
}

export default MovieDetailModal;
