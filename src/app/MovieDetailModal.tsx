import ModalBase from 'components/Modal/ModalBase';

type Props = {
  onClose: Function
}

function MovieDetailModal({ onClose }: Props) {
  return (
    <ModalBase
      id="movie-detail-modal"
      width={600}
      height={500}
      onClose={onClose}
    >

    </ModalBase>
  )
}

export default MovieDetailModal
