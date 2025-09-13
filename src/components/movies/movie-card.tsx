import { Star } from "lucide-react";
import Image from "next/image";

function MovieCard() {
  return (
    <div className="bg-[rgba(247,247,247,0.05)] rounded-[16px] overflow-hidden transition-all duration-400 ease-in-out cursor-pointer border border-transparent hover:-translate-y-2 hover:bg-[rgba(247,247,247,0.1)] hover:border-[#2E7D32] hover:shadow-[0_20px_40px_rgba(46,125,50,0.2)]">
      <Image
        src="/images/movie.webp"
        alt="Movie Poster"
        width={400}
        height={600}
        className="w-full h-auto object-cover"
      />
      <div className="p-4 text-left">
        <h1 className="text-success-content text-xl font-medium mb-2">
          The Cinematic Journey
        </h1>
        <p className="text-primary-content text-[0.95rem] leading-[1.5] overflow-hidden line-clamp-3">
          A breathtaking exploration of visual storytelling that takes audiences
          through the evolution of cinema, from silent films to modern
          masterpieces.
        </p>

        <div className="inline-block bg-[#2E7D32] text-white py-[0.3rem] px-[0.8rem] rounded-[20px] text-[0.85rem] font-medium mt-4">
          <Star className="inline-block w-4 h-4 mr-1 mb-0.5" />
          <span>8.5</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
