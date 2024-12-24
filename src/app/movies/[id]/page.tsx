"use client";
import { useAppSelector } from "store/hooks";
import { useParams } from "next/navigation";

export default function MoviePage() {
  const movies = useAppSelector(state => state.movie.movies)
  const { id } = useParams();
  const movie: FormattedResponseMovie | undefined = movies?.find(movie => movie.id === Number(id))

  return <div>{movie?.title}</div>;
}
