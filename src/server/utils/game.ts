import { TRPCError } from '@trpc/server';

import {
  KEY_EXPIRATION_TIME,
  USER_EXPIRATION_TIME,
  stringifyObject,
} from '~/utils/misc';
import { getPlayersById, publishUpdatedPlayers } from '~/utils/player';
import { redis } from '~/utils/redis';
import { fullGameSchema, gameSchema } from '~/utils/schemas';
import type { Game, Player, VotingSystem } from '~/utils/schemas';

interface CreateGameArgs {
  game: Game;
  player: Player;
  votingSystem: VotingSystem;
}

export async function createGame({
  game,
  player,
  votingSystem,
}: CreateGameArgs) {
  try {
    await redis
      .multi()
      .hset(`game:${game.id}`, stringifyObject(game))
      .sadd(`players:${game.id}`, player.id)
      .hset(`player:${player.id}`, stringifyObject(player))
      .hset(`voting-system:${game.id}`, stringifyObject(votingSystem))
      .expire(`game:${game.id}`, KEY_EXPIRATION_TIME)
      .expire(`players:${game.id}`, KEY_EXPIRATION_TIME)
      .expire(`player:${player.id}`, USER_EXPIRATION_TIME)
      .expire(`voting-system:${game.id}`, KEY_EXPIRATION_TIME)
      .exec();
  } catch (error) {
    console.log(error);
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
  }
}

interface JoinGameArgs {
  gameId: string;
  player: Player;
}

export async function joinGame({ gameId, player }: JoinGameArgs) {
  try {
    await redis
      .multi()
      .sadd(`players:${gameId}`, player.id)
      .hset(`player:${player.id}`, stringifyObject(player))
      .expire(`player:${player.id}`, USER_EXPIRATION_TIME)
      .exec();

    await publishUpdatedPlayers(gameId);
  } catch (error) {
    console.log(error);
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
  }
}

// Returns all game details including players and voting system
export async function getFullGameById(id: string) {
  const exists = Boolean(await redis.exists(`game:${id}`));

  if (!exists) throw new TRPCError({ code: 'NOT_FOUND' });

  const [game, playerIds, votingSystem, workItem] = await Promise.all([
    redis.hgetall(`game:${id}`),
    redis.smembers(`players:${id}`),
    redis.hgetall(`voting-system:${id}`),
    redis.hgetall(`work-item:${id}`),
  ]);

  const players = await getPlayersById(playerIds);

  const fullGame = {
    ...game,
    players,
    votingSystem,
    workItem,
  };

  const result = fullGameSchema.safeParse(fullGame);

  if (!result.success) {
    console.log(result.error);
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
  }

  return result.data;
}

export async function getGameById(id: string) {
  const exists = Boolean(await redis.exists(`game:${id}`));
  if (!exists) throw new TRPCError({ code: 'NOT_FOUND' });

  const player = await redis.hgetall(`game:${id}`);

  const result = gameSchema.safeParse(player);
  if (!result.success) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

  return result.data;
}

export async function publishUpdatedGame(gameId: string) {
  const game = await getGameById(gameId);

  await redis.publish(`game:${gameId}`, JSON.stringify(game));
}
