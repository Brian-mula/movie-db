"use client";

import MetaItem from "@/components/movies/meta-item";
import { fetchMovieById } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { SunIcon } from "lucide-react";
import { useParams } from "next/navigation";

function MovieDetails() {
   
    const param = useParams<{movieId:string}>();
    const {data,isPending,error} =  useQuery<MovieDetailsType>({
        queryKey:['movies', param.movieId],
        queryFn: () => fetchMovieById(param.movieId),
    })
    console.log(data)
    if(isPending) return <div className="h-[calc(100vh-10rem)] flex flex-col items-center justify-center w-full bg-neutral-900">
        <SunIcon className="animate-spin text-success-content" size={24} />
    </div>
    if(error) return <div className="h-[calc(100vh-10rem)] flex flex-col items-center justify-center w-full bg-neutral-900 text-error">Error: {error.message}</div>
    
    return (
        <div className="w-full px-4 py-12 md:py-24 lg:py-16 xl:py-24 md:px-8 lg:px-12 xl:px-16 2xl:px-[30rem]  flex justify-center items-center">
                 <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-[350px_1fr] md:gap-12">
            <div className="w-full h-[500px] bg-gradient-to-br from-[#666666] to-[#1C1C1C] rounded-[16px] flex items-center justify-center text-[4rem] text-[#666666] relative overflow-hidden">
                <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title} height={600} width={400} className="h-auto w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center max-w-4xl">
                <h1 className="text-4xl font-bold text-success-content mb-4">{data.title}</h1>
                <div className="flex items-start justify-between space-x-3 mb-4">
                    {/* meta data */}
                    <MetaItem title="Rating" value={data.vote_average} />
                    {/* <MetaItem title="Year" value={movie.year} />
                    <MetaItem title="Genre" value={movie.genre} /> */}
                </div>
                <p className="text-primary-content text-[1.1rem] leading-[1.6] mb-6 w-full max-w-3xl">{data.overview}</p>
            </div>
        </div>
        </div>
       
    )
}

export default MovieDetails
