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
    <div className="px-4 py-2 md:px-16 lg:px-28 xl:px-36 2xl:px-[30rem]text-xl lg:text-2xl w-full">
      <h1 className="text-lg lg:text-2xl text-primary-content py-4">
        Recommended Movies
      </h1>
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
  );
}

export default RecommendedMovieCarousel;
