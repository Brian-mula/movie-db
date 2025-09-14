"use client";
interface MovieReturnType {
  page: number;
  results: MovieType[];
  total_pages: number;
  total_results: number;
}

import { fetchMovies, searchMovies } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { SunIcon } from "lucide-react";
import MovieCard from "./movie-card";

function MovieList({ query }: { query?: string }) {
  const trimmedQuery = query?.trim() || "";
  const { data, isPending, error } = useQuery<MovieReturnType, Error>({
    queryKey: ["movies", trimmedQuery],
    queryFn: () => (trimmedQuery ? searchMovies(trimmedQuery) : fetchMovies()),
  });
  console.log(data);
  if (isPending)
    return (
      <div className="h-[calc(100vh-10rem)] flex flex-col items-center justify-center w-full bg-neutral-900">
        <SunIcon className="animate-spin text-success-content" size={24} />
      </div>
    );
  if (error)
    return (
      <div className="h-[calc(100vh-10rem)] flex flex-col items-center justify-center w-full bg-neutral-900 text-error">
        Error: {error.message}
      </div>
    );
  // if(!data || data.length === 0) return <div>No movies found</div>

  if (!data || data.results.length === 0)
    return (
      <div className="h-[calc(100vh-10rem)] flex flex-col items-center justify-center w-full bg-neutral-900 text-error">
        No movies found
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 py-6 ">
      {data.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
