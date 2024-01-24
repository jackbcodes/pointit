import { createId } from '@paralleldrive/cuid2';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { authenticate, setAuthCookie } from '~/utils/auth';
import { getGameById } from '~/utils/game';
import { GAME_EXPIRATION_TIME, USER_EXPIRATION_TIME } from '~/utils/misc';
import { keys, paths, redis } from '~/utils/redis';
import {
  Game,
  Player,
  User,
  createGameSchema,
  joinGameSchema,
} from '~/utils/schemas';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/utils/trpc';

export const gameRouter = createTRPCRouter({
  create: publicProcedure
    .input(createGameSchema)
    .mutation(async ({ ctx, input }) => {
      const gameId = createId();

      const user: User = {
        id: ctx.user?.id ?? createId(),
        name: input.playerName,
        gameId,
        isSpectator: ctx.user?.isSpectator ?? false,
      };

      const game: Game = {
        id: gameId,
        isRevealed: false,
        players: [
          {
            ...user,
            vote: '',
            joinedAt: new Date(),
          },
        ],
        votingSystem: input.votingSystem,
      };

      if (!ctx.user) setAuthCookie(user.id, ctx.res);

      try {
        await redis
          .multi()
          .call('JSON.SET', keys.game(game.id), '$', JSON.stringify(game))
          .call('JSON.SET', keys.user(user.id), '$', JSON.stringify(user))
          .expire(keys.game(game.id), GAME_EXPIRATION_TIME)
          .expire(keys.user(user.id), USER_EXPIRATION_TIME)
          .exec();
      } catch (error) {
        console.log(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }

      return gameId;
    }),

  join: publicProcedure
    .input(joinGameSchema)
    .mutation(async ({ ctx, input }) => {
      const exists = Boolean(await redis.exists(keys.game(input.gameId)));
      if (!exists) throw new TRPCError({ code: 'NOT_FOUND' });

      const token = await authenticate(ctx.req);

      const userId = token?.id ?? createId();

      if (!token?.id) setAuthCookie(userId, ctx.res);

      const playerCount = await redis.scard(`players:${input.gameId}`);

      if (playerCount >= 16) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message:
            'The maximum number of players has been reached. No more players can join at the moment.',
        });
      }

      const user: User = {
        id: userId,
        name: input.playerName,
        gameId: input.gameId,
        isSpectator: input.isSpectator,
      };

      const player: Player = {
        ...user,
        vote: '',
        joinedAt: new Date(),
      };

      try {
        await redis
          .multi()
          .call(
            'JSON.ARRAPPEND',
            keys.game(input.gameId),
            '$.players',
            JSON.stringify(player),
          )
          .call('JSON.SET', keys.user(user.id), '$', JSON.stringify(user))
          .expire(keys.user(user.id), USER_EXPIRATION_TIME)
          .exec();

        await redis.publish(
          keys.game(input.gameId),
          JSON.stringify({ player }),
        );
      } catch (error) {
        console.log(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }

      return;
    }),

  getById: publicProcedure
    .input(z.string())
    .query(({ input }) => getGameById(input)),

  toggleRevealVotes: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const [result] = (await redis.call(
        'JSON.TOGGLE',
        keys.game(ctx.user.gameId),
        '$.isRevealed',
      )) as [number];

      const isRevealed = Boolean(result);

      if (!isRevealed) {
        await redis.call(
          'JSON.SET',
          keys.game(ctx.user.gameId),
          paths.players('vote'),
          '""',
        );

        await redis.publish(
          keys.game(ctx.user.gameId),
          JSON.stringify({ isRevealed, players: { vote: '' } }),
        );
        return;
      }

      await redis.publish(
        keys.game(ctx.user.gameId),
        JSON.stringify({ isRevealed }),
      );
    } catch (error) {
      console.log(error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }),
});
