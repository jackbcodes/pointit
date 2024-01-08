import { Suspense, lazy } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PostHogProvider } from 'posthog-js/react';
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
  console.log('PostHog', {
    api_key: import.meta.env.VITE_POSTHOG_KEY,
    api_host: import.meta.env.VITE_POSTHOG_HOST,
  });

  console.log('process.env', {
    api_key: process.env.VITE_POSTHOG_KEY,
    api_host: process.env.VITE_POSTHOG_HOST,
  });

  return (
    <PostHogProvider
      apiKey={import.meta.env.VITE_POSTHOG_KEY}
      options={{ api_host: import.meta.env.VITE_POSTHOG_HOST }}
    >
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TRPCProvider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<Spinner />}>
              <RouterProvider router={router} />
            </Suspense>
          </QueryClientProvider>
        </TRPCProvider>
      </ThemeProvider>
    </PostHogProvider>
  );
}
