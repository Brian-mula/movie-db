import MovieList from "@/components/movies/movie-list";

function HomePage() {
  return (
    <>
      <div className="w-full px-4 md:px-8 lg:px-24 xl:px-32 2xl:px-[30rem] py-4  flex justify-center items-center">
        <input
          className={`w-full px-8 py-5 bg-[rgba(247,247,247,0.1)] border-2 border-transparent rounded-[50px] text-white text-[1.1rem] transition-all duration-300 ease-in-out backdrop-blur-[10px] placeholder:text-[#666666] focus:outline-none focus:bg-[rgba(247,247,247,0.15)] focus:border-[#2E7D32] focus:shadow-[0_0_0_4px_rgba(46,125,50,0.1)]`}
          id="search"
          type="text"
          placeholder="search for the movie..."
        />
      </div>
      <div className="w-full px-4 py-12 md:py-24 lg:py-16 xl:py-24 md:px-8 lg:px-12 xl:px-16 2xl:px-[30rem]  flex justify-center items-center">
       <MovieList />
      </div>
    </>
  );
}

export default HomePage;
