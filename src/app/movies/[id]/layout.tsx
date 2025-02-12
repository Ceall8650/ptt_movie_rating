import { getPlaiceholder } from "plaiceholder";
import { getMovie } from "services/Movies";
import ImageProvider from "./(Providers)/ImageProvider";

type Props = {
  readonly children: React.ReactNode
  readonly params: {
    readonly id: string
  }
}


async function getImageBase64(imageUrl: string) {
  try {
    const res = await fetch(imageUrl);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer)

    const { base64 } = await getPlaiceholder(buffer);

    return base64;
  } catch (error) {
    return '';
  }
}

async function MovieLayout({ children, params }: Props) {
  const movie: ResponseMovie = await getMovie(params.id)
  const imageUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`
  const base64 = await getImageBase64(imageUrl)

  return <ImageProvider image={{
    url: imageUrl,
    base64: base64
  }}>
    {children}
  </ImageProvider>
}

export default MovieLayout; 
