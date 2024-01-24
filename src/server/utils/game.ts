import { TRPCError } from '@trpc/server';

import { keys, redis } from '~/utils/redis';
import { gameSchema } from '~/utils/schemas';

export async function getGameById(id: string) {
  const value = await redis.call('JSON.GET', keys.game(id), '$');
  if (!value) throw new TRPCError({ code: 'NOT_FOUND' });

  const [game] = JSON.parse(value as string) as unknown[];

  const result = gameSchema.safeParse(game);
  if (!result.success) {
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
  }

  return result.data;
}
