import { Suspense, lazy } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ErrorBoundary } from '~/components/error-boundary';
import { Spinner } from '~/components/spinner';
import { ThemeProvider } from '~/components/theme-provider';
import { TRPCProvider, isTRPCClientError, trpcClient } from '~/utils/api';

const Root = lazy(() => import('~/routes/root'));
const Join = lazy(() => import('~/routes/join'));
const Game = lazy(() => import('~/routes/game'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/join/:gameId',
    element: <Join />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/game/:gameId',
    element: <Game />,
    errorElement: <ErrorBoundary />,
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
        isTRPCClientError(error) ? false : failureCount === 3,
      useErrorBoundary: true,
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
