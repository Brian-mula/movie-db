import { movies } from "@/utils/utils"
import MovieCard from "./movie-card"

function MovieList() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 py-6 ">
            {
                movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))
            }
           
        </div>
    )
}

export default MovieList
