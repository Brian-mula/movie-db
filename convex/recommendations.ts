import { ConvexError, v } from "convex/values";
import { api } from "./_generated/api";
import { action, mutation, query } from "./_generated/server";

const TMDB_API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmMxNTY1OTdkMWM0OWEyMGQ2NDUzMWUxZWQ5MzBlZiIsIm5iZiI6MTc1NzY2NDU1NC4wODMwMDAyLCJzdWIiOiI2OGMzZDUyYWI2M2I5ODE4NDkxOTlkYjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.d3MU-hYxen6aLmfYIuKXYm3J5VKpkMxjJ0U9AZTfLVk";
export const create = mutation({
  args: {
    movieId: v.number(),
    genreIds: v.array(v.number()),
    interactionType: v.union(
      v.literal("like"),
      v.literal("dislike"),
      v.literal("view")
    ),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }
    return await ctx.db.insert("userInteractions", {
      userId: user.subject,
      movieId: args.movieId,
      interactionType: args.interactionType,
      genreIds: args.genreIds,
    });
  },
});

export const get = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }
    const interactions = await ctx.db
      .query("userInteractions")
      .withIndex("by_user_id", (q) => q.eq("userId", user.subject))
      .collect();

    if (interactions.length === 0) {
      return []; // No history yet → fallback to TMDB trending
    }

    // 2. Count genres
    const genreCount: Record<number, number> = {};
    for (const interaction of interactions) {
      for (const genreId of interaction.genreIds) {
        genreCount[genreId] = (genreCount[genreId] || 0) + 1;
      }
    }

    // 3. Sort and return top 3 genres
    const topGenres = Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1])
      .map(([genreId]) => Number(genreId))
      .slice(0, 3);

    return topGenres;
  },
});

export const getUseRecommendations = action({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }
    const interactions: number[] = await ctx.runQuery(
      api.recommendations.get,
      {}
    );
    if (interactions.length === 0) {
      return { page: 1, results: [], total_pages: 0, total_results: 0 };
    }
    // No history yet → fallback to TMDB trending}
    const genreParam = interactions.join(",");
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreParam}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        accept: "application/json",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  },
});
