

export async function fetchMovies() {
   
  const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      accept: "application/json",
    },
  };
  const response = await fetch(url, options);

  const data = await response.json();
  return data;
}

export async function fetchMovieById(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      accept: "application/json",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}
