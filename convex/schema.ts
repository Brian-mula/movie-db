import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    userInteractions:defineTable({
        userId: v.string(),
        movieId: v.number(),
        interactionType: v.union(v.literal("like"), v.literal("dislike"), v.literal("view")),
        genreIds: v.array(v.number()),
    }).index("by_user_id", ["userId"]),
})