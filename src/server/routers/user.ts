import { router, publicProcedure } from '~/utils/trpc';

export const userRouter = router({
  get: publicProcedure.query(({ ctx }) => ctx.user ?? null),
});
