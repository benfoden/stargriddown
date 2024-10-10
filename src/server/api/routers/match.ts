import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const matchRouter = createTRPCRouter({
  create: publicProcedure.mutation(async ({ ctx }) => {
    const data = {
      player1Id: ctx.user?.id,
      gameMode: "standard",
      gameType: "unranked",
      statuses: '["created", "active"]',
      rounds: 0,
    };

    const match = await ctx.db.match.create({
      data,
    });

    await ctx.db.matchState.create({
      data: {
        matchId: match.id,
        state: {}, // Assuming 'state' is a required field and setting a default value
      },
    });

    return match;
  }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.match.findUnique({
        where: { id: input.id },
      });
    }),
  getInitialMatchState: publicProcedure
    .input(z.object({ matchId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.matchState.findFirst({
        where: { matchId: input.matchId },
      });
    }),

  getAllUserMatches: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.user?.id;

    return ctx.db.match.findMany({
      where: {
        OR: [{ player1Id: userId }, { player2Id: userId }],
      },
    });
  }),

  updateState: publicProcedure
    .input(
      z.object({
        state: z.object({ hello: z.string() }),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { state, id } = input;

      return ctx.db.matchState.update({
        where: { id },
        data: { state },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        player1Id: z.string().optional(),
        player2Id: z.string().optional(),
        player1StartDeckId: z.string().optional(),
        player2StartDeckId: z.string().optional(),
        player1MarketDeckId: z.string().optional(),
        player2MarketDeckId: z.string().optional(),
        gameMode: z.string().optional(),
        gameType: z.string().optional(),
        statuses: z.string().optional(),
        rounds: z.number().optional(),
        matchState: z.any().optional(),
        startedAt: z.date().optional(),
        endedAt: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.match.update({
        where: { id },
        data,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.match.delete({
        where: { id: input.id },
      });
    }),
});
