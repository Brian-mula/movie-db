import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";

function MovieCard({movie,index}:{movie:MovieType,index:number}) {
  const router = useRouter();
  const create = useMutation(api.recommendations.create);

  const onMovieClick = async(movieId:number,genreIds:number[])=>{
    await create({
      movieId,
      interactionType: "view",
      genreIds
    });
    router.push(`/${movieId}`);
  }
  return (
   
   <div onClick={()=> onMovieClick(movie.id,movie.genre_ids)} className="w-80">
     <motion.div
     initial={{ opacity: 0, y: 30 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ delay: index * 0.1, duration: 0.4 }}
     className="bg-[rgba(247,247,247,0.05)] rounded-[16px] overflow-hidden transition-all duration-400 ease-in-out cursor-pointer border border-transparent hover:-translate-y-2 hover:bg-[rgba(247,247,247,0.1)] hover:border-[#2E7D32] hover:shadow-[0_20px_40px_rgba(46,125,50,0.2)]">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={320}
        height={256}
        className="w-80 h-64 object-cover"
      />
      
      <div className="p-4 text-left">
        <h1 className="text-success-content text-xl font-medium mb-2 truncate">
          {movie.title}
        </h1>
        <p className="text-primary-content text-[0.95rem] leading-[1.5] overflow-hidden line-clamp-3">
            {movie.overview}
        </p>

        <div className="inline-block bg-[#2E7D32] text-white py-[0.3rem] px-[0.8rem] rounded-[20px] text-[0.85rem] font-medium mt-4">
          <Star className="inline-block w-4 h-4 mr-1 mb-0.5" />
          <span>{Math.floor(movie.vote_average)}</span>
        </div>
      </div>
    </motion.div>
   
   </div>
  
   
  );
}

export default MovieCard;
