import { createId } from '@paralleldrive/cuid2';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { authenticate, setAuthCookie } from '~/utils/auth';
import {
  createGame,
  getFullGameById,
  joinGame,
  publishUpdatedGame,
} from '~/utils/game';
import { publishUpdatedPlayers } from '~/utils/player';
import { redis } from '~/utils/redis';
import { createGameSchema, joinGameSchema } from '~/utils/schemas';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/utils/trpc';

export const gameRouter = createTRPCRouter({
  create: publicProcedure
    .input(createGameSchema)
    .mutation(async ({ ctx, input }) => {
      const playerId = ctx.player?.id ?? createId();

      if (!ctx.player?.id) setAuthCookie(playerId, ctx.res);

      const gameId = createId();

      await createGame({
        game: {
          id: gameId,
          name: input.gameName,
          isRevealed: false,
        },
        player: {
          id: playerId,
          name: input.playerName,
          gameId,
          vote: '',
          isSpectator: false,
          joinedAt: new Date(),
          createdAt: new Date(),
        },
        votingSystem: input.votingSystem,
      });

      return gameId;
    }),

  join: publicProcedure
    .input(joinGameSchema)
    .mutation(async ({ ctx, input }) => {
      const exists = Boolean(await redis.exists(`game:${input.gameId}`));

      if (!exists) throw new TRPCError({ code: 'NOT_FOUND' });

      const jwtPayload = await authenticate(ctx.req);

      const playerId = jwtPayload?.id ?? createId();

      if (!jwtPayload?.id) setAuthCookie(playerId, ctx.res);

      await joinGame({
        gameId: input.gameId,
        player: {
          id: playerId,
          name: input.playerName,
          gameId: input.gameId,
          vote: '',
          isSpectator: input.isSpectator,
          joinedAt: new Date(),
          createdAt: new Date(),
        },
      });

      return;
    }),

  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => getFullGameById(input)),

  toggleRevealVotes: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const prevValue = await redis.hget(
        `game:${ctx.player.gameId}`,
        'isRevealed',
      );

      await redis.hset(
        `game:${ctx.player.gameId}`,
        'isRevealed',
        String(prevValue === 'false'),
      );

      const shouldResetVotes = prevValue === 'true';

      if (shouldResetVotes) {
        const playerIds = await redis.smembers(`players:${ctx.player.gameId}`);

        await Promise.all(
          playerIds.map((id) => redis.hset(`player:${id}`, 'vote', '')),
        );

        await publishUpdatedPlayers(ctx.player.gameId);
      }

      await publishUpdatedGame(ctx.player.gameId);
    } catch (error) {
      console.log(error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }),
});
