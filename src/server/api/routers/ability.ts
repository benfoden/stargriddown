import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const abilityRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        shortName: z.string().optional(),
        type: z.string().min(1),
        shortDesc: z.string().optional(),
        isUsable: z.boolean().optional(),
        targetType: z.string().optional(),
        desc: z.string().optional(),
        attack: z.number().optional(),
        defense: z.number().optional(),
        yen: z.number().optional(),
        lag: z.number().optional(),
        datab: z.number().optional(),
        mw: z.number().optional(),
        logic: z.string().optional(),
        control: z.number().optional(),
        costYen: z.number().optional(),
        costDatab: z.number().optional(),
        costMw: z.number().optional(),
        costLag: z.number().optional(),
        costControl: z.number().optional(),
        image: z.string().optional(),
        ruleSet: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.ability.create({
        data: input,
      });
    }),
  createInstance: publicProcedure
    .input(
      z.object({
        abilityId: z.string(),
        targetType: z.string().optional(),
        desc: z.string().optional(),
        attack: z.number().optional(),
        defense: z.number().optional(),
        yen: z.number().optional(),
        lag: z.number().optional(),
        datab: z.number().optional(),
        mw: z.number().optional(),
        control: z.number().optional(),
        logic: z.string().optional(),
        costYen: z.number().optional(),
        costControl: z.number().optional(),
        costDatab: z.number().optional(),
        costMw: z.number().optional(),
        costLag: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.abilityInstance.create({
        data: input,
      });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        shortName: z.string().optional(),
        type: z.string().min(1).optional(),
        shortDesc: z.string().optional(),
        isUsable: z.boolean().optional(),
        targetType: z.string().optional(),
        desc: z.string().optional(),
        attack: z.number().optional(),
        defense: z.number().optional(),
        yen: z.number().optional(),
        lag: z.number().optional(),
        datab: z.number().optional(),
        mw: z.number().optional(),
        control: z.number().optional(),
        logic: z.string().optional(),
        costYen: z.number().optional(),
        costDatab: z.number().optional(),
        costMw: z.number().optional(),
        costControl: z.number().optional(),
        costLag: z.number().optional(),
        image: z.string().optional(),
        ruleSet: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.ability.update({
        where: { id },
        data,
      });
    }),

  updateInstance: publicProcedure
    .input(
      z.object({
        id: z.string(),
        targetType: z.string().optional(),
        desc: z.string().optional(),
        attack: z.number().optional(),
        defense: z.number().optional(),
        yen: z.number().optional(),
        lag: z.number().optional(),
        datab: z.number().optional(),
        mw: z.number().optional(),
        control: z.number().optional(), // Added control as it exists in AbilityInstance
        logic: z.string().optional(),
        costYen: z.number().optional(),
        costControl: z.number().optional(), // Changed costLag to costControl
        costDatab: z.number().optional(),
        costMw: z.number().optional(),
        costLag: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      return ctx.db.abilityInstance.update({
        where: { id },
        data,
      });
    }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.ability.findUnique({
        where: { id: input.id },
      });
    }),
  getInstance: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.abilityInstance.findUnique({
        where: { id: input.id },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.ability.findMany();
  }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.ability.delete({
        where: { id: input.id },
      });
    }),
  deleteInstance: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.abilityInstance.delete({
        where: { id: input.id },
      });
    }),
});
