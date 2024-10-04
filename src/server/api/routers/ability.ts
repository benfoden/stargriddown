import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const abilityRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        variant: z.string().min(1),
        shortDesc: z.string().optional(),
        isUsable: z.boolean().optional(),
        desc: z.string().optional(),
        attack: z.number().optional(),
        defense: z.number().optional(),
        yen: z.number().optional(),
        lag: z.number().optional(),
        datab: z.number().optional(),
        mw: z.number().optional(),
        logic: z.string().optional(),
        costYen: z.number().optional(),
        costDatab: z.number().optional(),
        costMw: z.number().optional(),
        costLag: z.number().optional(),
        image: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.ability.create({
        data: input,
      });
    }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.ability.findUnique({
        where: { id: input.id },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.ability.findMany();
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        variant: z.string().optional(),
        shortDesc: z.string().optional(),
        isUsable: z.boolean().optional(),
        desc: z.string().optional(),
        attack: z.number().optional(),
        defense: z.number().optional(),
        yen: z.number().optional(),
        lag: z.number().optional(),
        datab: z.number().optional(),
        mw: z.number().optional(),
        logic: z.string().optional(),
        costYen: z.number().optional(),
        costDatab: z.number().optional(),
        costMw: z.number().optional(),
        costLag: z.number().optional(),
        image: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.ability.update({
        where: { id },
        data,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.ability.delete({
        where: { id: input.id },
      });
    }),
});
