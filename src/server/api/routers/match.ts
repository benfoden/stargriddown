import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const matchRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        player1Id: z.string().optional(),
        player2Id: z.string().optional(),
        player1StartDeckId: z.string().optional(),
        player2StartDeckId: z.string().optional(),
        player1MarketDeckId: z.string().optional(),
        player2MarketDeckId: z.string().optional(),
        gameMode: z.string().optional(),
        gameType: z.string().optional(),
        statuses: z.string(),
        rounds: z.number().optional(),
        matchState: z.any().optional(),
        startedAt: z.date().optional(),
        endedAt: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.match.create({
        data: input,
      });
    }),

  read: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.match.findUnique({
        where: { id: input.id },
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
