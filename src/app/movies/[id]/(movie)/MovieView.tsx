import Image from 'next/image';
import { useContext } from "react";
import { ImageContext } from "@/app/movies/[id]/(Providers)/ImageProvider";

type Props = {
  readonly movie: ResponseMovie
}

function MovieView({ movie }: Props) {
  const image = useContext(ImageContext) as MovieImage

  return (
    <div className="h-full">
      <div className="flex justify-center relative">
        <Image
          src={image.url}
          alt={movie.title}
          width={150}
          height={200}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="md:[width:200px] mr-4"
          placeholder="blur"
          blurDataURL={image.base64}
        />
        <div className="text-2xl font-bold pt-2">{movie.title}</div>
      </div>
    </div>
  );
}

export default MovieView;
