import { createTRPCRouter } from '~/utils/trpc';

import { gameRouter } from './game';
import { playerRouter } from './player';
import { userRouter } from './user';
import { workItemRouter } from './work-item';

/**
 * This is the primary router for your server.
 *
 * All routers added in /server/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  game: gameRouter,
  player: playerRouter,
  workItem: workItemRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;

export { subscribeRouter } from './subscribe';
