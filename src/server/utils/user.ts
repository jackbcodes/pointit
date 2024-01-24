import { TRPCError } from '@trpc/server';

import { keys, redis } from '~/utils/redis';
import { userSchema } from '~/utils/schemas';

export async function getUserById(id: string) {
  const value = await redis.call('JSON.GET', keys.user(id), '$');
  if (!value) throw new TRPCError({ code: 'NOT_FOUND' });

  const [user] = JSON.parse(value as string) as unknown[];

  const result = userSchema.safeParse(user);
  if (!result.success) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

  return result.data;
}
