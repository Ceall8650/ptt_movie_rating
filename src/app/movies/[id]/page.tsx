"use client";

import { useParams } from "next/navigation";
import { useQueryMovie } from "services/hooks/useQueryMovie";
import MovieView from "./(movie)/MovieView";

export default function MoviePage() {
  const { id } = useParams();
  const { data: movie } = useQueryMovie(id as string);

  return (
    <MovieView movie={movie} />
  );
}
