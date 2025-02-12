"use client";
import { useParams, notFound } from "next/navigation";
import { useQueryMovie } from "services/hooks/useQueryMovie";
import MovieSearching from "app/(Movie)/MovieSearching";
import MovieView from "./(movie)/MovieView";
export default function MoviePage() {
  const { id } = useParams();
  const { data: movie, isLoading, isError } = useQueryMovie(id as string);

  if (isError) {
    notFound()
  }

  if (isLoading) {
    return <MovieSearching />
  }

  return (
    movie
      ? <MovieView movie={movie} />
      : notFound()
  );
}
