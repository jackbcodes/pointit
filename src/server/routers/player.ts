import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { publishUpdatedGame } from '~/utils/game';
import { publishUpdatedPlayers } from '~/utils/player';
import { redis } from '~/utils/redis';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/utils/trpc';

export const playerRouter = createTRPCRouter({
  // eslint-disable-next-line unicorn/no-null -- react-query doesn't allow sending undefined
  get: publicProcedure.query(({ ctx }) => ctx.player ?? null),

  vote: protectedProcedure
    .input(z.string().optional())
    .mutation(async ({ ctx, input }) => {
      try {
        await redis.hset(`player:${ctx.player.id}`, 'vote', input ?? '');

        await publishUpdatedPlayers(ctx.player.gameId);
      } catch (error) {
        console.log(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

  toggleSpectatorMode: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const prevValue = await redis.hget(
        `player:${ctx.player.id}`,
        'isSpectator',
      );

      await redis.hset(
        `player:${ctx.player.id}`,
        'isSpectator',
        String(prevValue === 'false'),
      );

      await publishUpdatedPlayers(ctx.player.gameId);
    } catch (error) {
      console.log(error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }),

  changeName: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        await redis.hset(`player:${ctx.player.id}`, 'name', input);

        await publishUpdatedPlayers(ctx.player.gameId);
      } catch (error) {
        console.log(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

  leaveGame: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await Promise.all([
        redis.hset(`player:${ctx.player.id}`, 'gameId', '', 'vote', ''),
        redis.srem(`players:${ctx.player.gameId}`, ctx.player.id),
      ]);

      await Promise.all([
        publishUpdatedPlayers(ctx.player.gameId),
        publishUpdatedGame(ctx.player.gameId),
      ]);

      const exists = Boolean(
        await redis.exists(`players:${ctx.player.gameId}`),
      );

      if (!exists)
        await redis.del(
          `game:${ctx.player.gameId}`,
          `voting-system:${ctx.player.gameId}`,
        );
    } catch (error) {
      console.log(error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }),
});
