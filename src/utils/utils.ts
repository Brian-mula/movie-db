export async function fetchMovies(page: number) {
  const url =
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
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

export async function searchMovies(query: string) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    query
  )}&include_adult=false&language=en-US&page=1`;
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
