import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { keys, redis, paths } from '~/utils/redis';
import { router, protectedProcedure } from '~/utils/trpc';

export const playerRouter = router({
  vote: protectedProcedure
    .input(z.string().optional())
    .mutation(async ({ ctx, input }) => {
      try {
        await redis.call(
          'JSON.SET',
          keys.game(ctx.user.gameId),
          paths.player(ctx.user.id, 'vote'),
          `"${input}"`,
        );

        await redis.publish(
          keys.game(ctx.user.gameId),
          JSON.stringify({ player: { id: ctx.user.id, vote: input } }),
        );
      } catch (error) {
        console.error(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

  toggleSpectatorMode: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const response = await redis
        .multi()
        .call(
          'JSON.TOGGLE',
          keys.game(ctx.user.gameId),
          paths.player(ctx.user.id, 'isSpectator'),
        )
        .call('JSON.TOGGLE', keys.user(ctx.user.id), `$.isSpectator`)
        .call(
          'JSON.SET',
          keys.game(ctx.user.gameId),
          paths.player(ctx.user.id, 'vote'),
          `""`,
        )
        .exec();

      if (!response) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

      const [[, result]] = response as [Error | null, boolean[]][];

      const isSpectator = Boolean(result[0]);

      await redis.publish(
        keys.game(ctx.user.gameId),
        JSON.stringify({ player: { id: ctx.user.id, isSpectator } }),
      );
    } catch (error) {
      console.error(error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }),

  changeName: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        await redis
          .multi()
          .call(
            'JSON.SET',
            keys.game(ctx.user.gameId),
            paths.player(ctx.user.id, 'name'),
            `"${input}"`,
          )
          .call('JSON.SET', keys.user(ctx.user.id), `$.name`, `"${input}"`)
          .exec();

        await redis.publish(
          keys.game(ctx.user.gameId),
          JSON.stringify({ player: { id: ctx.user.id, name: input } }),
        );
      } catch (error) {
        console.error(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

  leaveGame: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await redis
        .multi()
        .call('JSON.DEL', keys.game(ctx.user.gameId), paths.player(ctx.user.id))
        .call('JSON.SET', keys.user(ctx.user.id), `$.gameId`, '""')
        .exec();

      await redis.publish(
        keys.game(ctx.user.gameId),
        JSON.stringify({ isLeaveGame: true, id: ctx.user.id }),
      );
    } catch (error) {
      console.error(error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }),
});
