"use client";

import MetaItem from "@/components/movies/meta-item";
import { fetchMovieById } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { SunIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

function MovieDetails() {
  const param = useParams<{ movieId: string }>();
  const { data, isPending, error } = useQuery<MovieType, Error>({
    queryKey: ["movies", param.movieId],
    queryFn: () => fetchMovieById(param.movieId),
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

  return (
    <div className="w-full px-4 py-12 md:py-24 lg:py-16 xl:py-24 md:px-8 lg:px-12 xl:px-16 2xl:px-[30rem]  flex justify-center items-center">
      <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-[350px_1fr] md:gap-12">
        <div className="w-full h-[500px] bg-gradient-to-br from-[#666666] to-[#1C1C1C] rounded-[16px] flex items-center justify-center text-[4rem] text-[#666666] relative overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
            width={400}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex flex-col justify-center max-w-4xl">
          <h1 className=" text-xl lg:text-4xl font-bold text-success-content mb-4">
            {data.title}
          </h1>
          <q className="text-lg lg:text-xl font-normal text-success mb-4 italic">
            {data.tagline}
          </q>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {/* meta data */}
            <MetaItem
              title="Status"
              value={data.status}
            />
            <MetaItem
              title="Rating"
              value={`${Math.floor(data.vote_average)} / 10`}
            />
            <MetaItem
              title="Revenue"
              value={data.revenue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            />
            <MetaItem
              title="Budget"
              value={data.budget.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            />
            <MetaItem title="Votes" value={data.vote_count.toString()} />
            <MetaItem title="Popularity" value={data.popularity.toString()} />
            <MetaItem title="Release" value={data.release_date} />
            <MetaItem
              title="Language"
              value={data.original_language.toUpperCase()}
            />
          </div>
          <p className="text-primary-content text-[1.1rem] leading-[1.6] mb-6 w-full max-w-3xl">
            {data.overview}
          </p>
          <div className="mb-6">
            <h1 className="text-xl font-medium uppercase">Genre</h1>
            {
              <div className="flex flex-wrap gap-2 mt-2">
                {data.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-[rgba(247,247,247,0.1)] border-2 border-transparent rounded-[50px] text-white text-[0.9rem] transition-all duration-300 ease-in-out backdrop-blur-[10px]"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            }
          </div>

          <div className="mb-6">
            <h1 className="text-xl font-medium uppercase">Production Companies</h1>
            {
              <div className="flex flex-wrap gap-2 mt-2">
                {data.production_companies.map((company) => (
                  <span
                    key={company.id}
                    className="px-3 py-1 bg-[rgba(247,247,247,0.1)] border-2 border-transparent rounded-[50px] text-white text-[0.9rem] transition-all duration-300 ease-in-out backdrop-blur-[10px]"
                  >
                    {company.name}
                  </span>
                ))}
              </div>
            }

          </div>
          <div className="mb-6">
            <h1 className="text-xl font-medium uppercase">Production Countries</h1>
            {
              <div className="flex flex-wrap gap-2 mt-2">
                {data.production_countries.map((country) => (
                  <span
                    key={country.iso_3166_1}
                    className="px-3 py-1 bg-[rgba(247,247,247,0.1)] border-2 border-transparent rounded-[50px] text-white text-[0.9rem] transition-all duration-300 ease-in-out backdrop-blur-[10px]"
                  >
                    {country.name}
                  </span>
                ))}
              </div>
            }
          </div>
              <div>
            <h1 className="text-xl font-medium uppercase">Spoken Languages</h1>
            {
              <div className="flex flex-wrap gap-2 mt-2">
                {data.spoken_languages.map((lang) => (
                  <span
                    key={lang.iso_639_1}
                    className="px-3 py-1 bg-[rgba(247,247,247,0.1)] border-2 border-transparent rounded-[50px] text-white text-[0.9rem] transition-all duration-300 ease-in-out backdrop-blur-[10px]"
                  >
                    {lang.name}
                  </span>
                ))}
              </div>
            }
              </div>
          
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
