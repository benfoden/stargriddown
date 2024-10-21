import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name } = input;
      const { id, email } = ctx.user;

      return ctx.db.user.create({
        data: {
          id,
          email: email ?? "",
          name: name ?? "", // Provide a default value for optional name
        },
      });
    }),

  read: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: { id: ctx.user.id },
    });
  }),

  update: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { ...data } = input;
      return ctx.db.user.update({
        where: { id: ctx.user.id },
        data,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.delete({
        where: { id: input.id },
      });
    }),
});
