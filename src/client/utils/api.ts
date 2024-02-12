import { TRPCClientError, httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import superjson from 'superjson';

import type { AppRouter } from '../../server/routers/_app';

const trpc = createTRPCReact<AppRouter>();

export const TRPCProvider = trpc.Provider;

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/api',
      async fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      },
      transformer: superjson,
    }),
  ],
});

export { trpc as api };

export function isTRPCClientError(
  error: unknown,
): error is TRPCClientError<AppRouter> {
  return error instanceof TRPCClientError;
}
