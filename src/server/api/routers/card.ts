import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const cardRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        type: z.string(),
        variant: z.string().optional(),
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
        abilityInstanceIds: z.array(z.string()).optional(), // Expecting an array of ability instance IDs
        rarity: z.string().optional(),
        deckId: z.string().optional(),
        control: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { abilityInstanceIds, ...cardData } = input;

      const createdCard = await ctx.db.card.create({
        data: {
          ...cardData,
          cardAbilities: {
            create: abilityInstanceIds?.map((abilityInstanceId) => ({
              abilityInstance: {
                connect: { id: abilityInstanceId },
              },
            })),
          },
        },
      });

      return createdCard;
    }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.card.findUnique({
        where: { id: input.id },
        include: {
          cardAbilities: {
            include: {
              abilityInstance: true,
            },
          },
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.card.findMany({
      include: {
        cardAbilities: {
          include: {
            abilityInstance: true,
          },
        },
      },
    });
  }),

  getByDeckId: publicProcedure
    .input(z.object({ deckId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.card.findMany({
        where: { deckId: input.deckId },
        include: {
          cardAbilities: {
            include: {
              abilityInstance: true,
            },
          },
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        type: z.string(),
        variant: z.string().optional(),
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
        abilityInstanceIds: z.array(z.string()).optional(), // Expecting an array of ability instance IDs
        rarity: z.string().optional(),
        deckId: z.string().optional(),
        control: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, abilityInstanceIds, ...data } = input;

      const updatedCard = await ctx.db.card.update({
        where: { id },
        data,
      });

      if (abilityInstanceIds) {
        await ctx.db.cardAbility.deleteMany({
          where: { cardId: id },
        });

        await ctx.db.cardAbility.createMany({
          data: abilityInstanceIds.map((abilityId) => ({
            cardId: id,
            abilityId,
          })),
        });
      }

      return updatedCard;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.card.delete({
        where: { id: input.id },
      });
    }),
});
