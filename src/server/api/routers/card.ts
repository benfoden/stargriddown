import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const cardRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        desc: z.string().optional(),
        shortDesc: z.string().optional(),
        flavor: z.string().optional(),
        yen: z.number().optional(),
        attack: z.number().optional(),
        datab: z.number().optional(),
        defense: z.number().optional(),
        mw: z.number().optional(),
        lag: z.number().optional(),
        costYen: z.number().optional(),
        costDatab: z.number().optional(),
        costMw: z.number().optional(),
        costLag: z.number().optional(),
        image: z.string().optional(),
        abilities: z.any().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.card.create({
        data: input,
      });
    }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.card.findUnique({
        where: { id: input.id },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.card.findMany();
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        desc: z.string().optional(),
        shortDesc: z.string().optional(),
        flavor: z.string().optional(),
        yen: z.number().optional(),
        attack: z.number().optional(),
        datab: z.number().optional(),
        defense: z.number().optional(),
        mw: z.number().optional(),
        lag: z.number().optional(),
        costYen: z.number().optional(),
        costDatab: z.number().optional(),
        costMw: z.number().optional(),
        costLag: z.number().optional(),
        image: z.string().optional(),
        abilities: z.any().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.card.update({
        where: { id },
        data,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.card.delete({
        where: { id: input.id },
      });
    }),
});
