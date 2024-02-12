import { router, publicProcedure } from '~/utils/trpc';

export const userRouter = router({
  // eslint-disable-next-line unicorn/no-null -- react-query doesn't allow sending undefined
  get: publicProcedure.query(({ ctx }) => ctx.user ?? null),
});
