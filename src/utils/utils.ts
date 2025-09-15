
export async function fetchMovies(page: number) {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
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

export async function fetchRecommendedMovies(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`;
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

// export async function fetchMoviesByGenre() {
 
//   const convexServer = new ConvexClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
//   const topGenres:number[] = await convexServer.query(api.recommendations.get,{})
//   if (topGenres.length === 0) {
//     // No history yet → fallback to TMDB trending
//     return fetchMovies(1);
//   }
  
  
//   const genreParam = topGenres.join(",");
//   const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreParam}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
//   const options = {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
//       accept: "application/json",
//     },
//   };
//   const response = await fetch(url, options);
//   const data = await response.json();
//   return data;
// }
