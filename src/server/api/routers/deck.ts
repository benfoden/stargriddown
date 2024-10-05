import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const deckRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        desc: z.string().optional(),
        shortDesc: z.string().optional(),
        type: z.string().optional(),
        image: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.deck.create({
        data: input,
      });
    }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.deck.findUnique({
        where: { id: input.id },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.deck.findMany();
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        desc: z.string().optional(),
        shortDesc: z.string().optional(),
        type: z.string().optional(),
        image: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.deck.update({
        where: { id },
        data,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.deck.delete({
        where: { id: input.id },
      });
    }),
});
