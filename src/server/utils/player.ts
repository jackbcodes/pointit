import { TRPCError } from '@trpc/server';

import { redis } from '~/utils/redis';
import { playerSchema } from '~/utils/schemas';

export async function getPlayerById(id: string) {
  const exists = Boolean(await redis.exists(`player:${id}`));
  if (!exists) return;

  const player = await redis.hgetall(`player:${id}`);

  const result = playerSchema.safeParse(player);
  if (!result.success) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

  return result.data;
}

export async function getPlayersById(ids: string[]) {
  const players = await Promise.all(ids.map((id) => getPlayerById(id)));

  return players
    .filter(Boolean)
    .sort((a, b) => a.joinedAt.getTime() - b.joinedAt.getTime());
}

export async function getPlayersByGameId(gameId: string) {
  const playerIds = await redis.smembers(`players:${gameId}`);

  return await getPlayersById(playerIds);
}

export async function publishUpdatedPlayers(gameId: string) {
  const players = await getPlayersByGameId(gameId);

  await redis.publish(`game:${gameId}`, JSON.stringify({ players }));
}
