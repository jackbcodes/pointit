import { Suspense, lazy } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TRPCClientError } from '@trpc/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Spinner } from '~/components/spinner';
import { ThemeProvider } from '~/components/theme-provider';
import { TRPCProvider, trpcClient } from '~/utils/api';

const Root = lazy(() => import('~/routes/root'));
const Join = lazy(() => import('~/routes/join'));
const Game = lazy(() => import('~/routes/game'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },

  {
    path: '/join/:gameId',
    element: <Join />,
  },
  {
    path: '/game/:gameId',
    element: <Game />,
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) =>
        error instanceof TRPCClientError ? false : failureCount === 3,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TRPCProvider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<Spinner />}>
            <RouterProvider router={router} />
          </Suspense>
        </QueryClientProvider>
      </TRPCProvider>
    </ThemeProvider>
  );
}
