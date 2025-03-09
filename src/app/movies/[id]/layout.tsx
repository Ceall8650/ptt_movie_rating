import { getPlaiceholder } from "plaiceholder";
import { ErrorBoundary } from 'react-error-boundary'
import { notFound } from 'next/navigation'
import { getMovie } from "services/Movies";
import ImageProvider from "./(Providers)/ImageProvider";
import NotFound from "app/not-found";

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

async function getMovieData(movieId: string) {
  try {
    const movie: ResponseMovie = await getMovie(movieId)
    const imageUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`
    const base64 = await getImageBase64(imageUrl)

    return {
      imageUrl,
      base64
    }
  } catch (error) {
    notFound()
  }
}

async function MovieLayout({ children, params }: Props) {
  const { imageUrl, base64 } = await getMovieData(params.id)

  return <ImageProvider image={{
    url: imageUrl,
    base64: base64
  }}>
    <ErrorBoundary fallback={<NotFound />}>
      {children}
    </ErrorBoundary>
  </ImageProvider>
}

export default MovieLayout; 
