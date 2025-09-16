import { useAction } from "convex/react";
import { useEffect, useState } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { api } from "../../../convex/_generated/api";
import MovieCard from "./movie-card";
import { MovieReturnType } from "./movie-list";

function RecommendedMovieCarousel() {
  const getRecommendations = useAction(
    api.recommendations.getUseRecommendations
  );
  const [recoomendedMovies, setRecommendedMovies] = useState<MovieReturnType>();

  useEffect(() => {
    async function fetchData() {
      const recs = await getRecommendations();
      setRecommendedMovies(recs);
      console.log(recs);
    }

    fetchData();
  }, [getRecommendations]);
  if (!recoomendedMovies || !recoomendedMovies.results || recoomendedMovies.results.length === 0) {
    return null;
  }
  return (
    <div className="px-4 py-2 md:px-10 lg:px-14 xl:px-28 text-xl lg:text-2xl w-full">
      <h1 className="text-lg lg:text-2xl text-primary-content py-4 xl:px-20 2xl:px-[40rem]">
        Recommended Movies
      </h1>
      <div className="w-full px-4 py-2 md:px-8 lg:px-12 xl:px-16 2xl:px-[40rem]  flex justify-center items-center">
      <Swiper
      modules={[Autoplay]}
        spaceBetween={16}
        direction="horizontal"
        autoplay={{
            delay: 3000,
            disableOnInteraction: false,
        }}
        loop={true}
        className="w-full"
        breakpoints={{
          0: { slidesPerView: 1 },
         
          768: { slidesPerView: 3 },
         
        }}
      >
        {recoomendedMovies.results.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <MovieCard  movie={movie} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
      
    </div>
  );
}

export default RecommendedMovieCarousel;
