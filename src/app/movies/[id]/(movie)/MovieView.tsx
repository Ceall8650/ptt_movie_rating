import Image from "next/image";

type Props = {
  readonly movie: ResponseMovie
}

function MovieView({ movie }: Props) {
  return (
    <div className="h-full">
      <div className="flex justify-center relative">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          width={150}
          height={200}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="md:[width:200px]"
          placeholder="blur"
          blurDataURL={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        />
        {movie.title}
      </div>
    </div>
  );
}

export default MovieView;
