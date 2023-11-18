import { TRPCError } from '@trpc/server';

import { redis } from '~/utils/redis';
import { workItemSchema } from '~/utils/schemas';
import { createTRPCRouter, protectedProcedure } from '~/utils/trpc';

export const workItemRouter = createTRPCRouter({
  add: protectedProcedure
    .input(workItemSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await redis.hset(`work-item:${ctx.player.gameId}`, input);

        await redis.publish(
          `game:${ctx.player.gameId}`,
          JSON.stringify({ workItem: input }),
        );
      } catch (error) {
        console.log(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

  remove: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await redis.del(`work-item:${ctx.player.gameId}`);

      await redis.publish(
        `game:${ctx.player.gameId}`,
        JSON.stringify({ workItem: {} }),
      );
    } catch (error) {
      console.log(error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }),
});
