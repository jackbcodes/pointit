import { TRPCError, initTRPC } from '@trpc/server';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { authenticate } from '~/utils/auth';
import { getPlayerById } from '~/utils/player';

export const createContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  const user = await authenticate(req);

  if (!user) return { req, res, player: undefined };

  const player = await getPlayerById(user.id);
  return { req, res, player };
};

const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : undefined,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.player) throw new TRPCError({ code: 'UNAUTHORIZED' });

  return next({
    ctx: {
      player: ctx.player,
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
