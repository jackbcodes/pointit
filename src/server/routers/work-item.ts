import { TRPCError } from '@trpc/server';

import { keys, redis } from '~/utils/redis';
import { workItemSchema } from '~/utils/schemas';
import { router, protectedProcedure } from '~/utils/trpc';

export const workItemRouter = router({
  add: protectedProcedure
    .input(workItemSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await redis.call(
          'JSON.SET',
          keys.game(ctx.user.gameId),
          '$.workItem',
          JSON.stringify(input),
        );

        await redis.publish(
          keys.game(ctx.user.gameId),
          JSON.stringify({ workItem: input }),
        );
      } catch (error) {
        console.error(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

  remove: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await redis.call('JSON.DEL', keys.game(ctx.user.gameId), '$.workItem');

      await redis.publish(
        keys.game(ctx.user.gameId),
        JSON.stringify({ workItem: {} }),
      );
    } catch (error) {
      console.error(error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }),
});
