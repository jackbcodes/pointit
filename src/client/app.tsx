import { Suspense } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ErrorBoundary } from '~/components/error-boundary';
import { Spinner } from '~/components/spinner';
import { ThemeProvider } from '~/components/theme-provider';
import { Toaster } from '~/components/ui/toaster';
import { Join } from '~/routes/join';
import { TRPCProvider, isTRPCClientError, trpcClient } from '~/utils/api';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorBoundary />,
    lazy: () => import('~/routes/root'),
  },
  {
    path: '/join/:gameId',
    errorElement: <ErrorBoundary />,
    element: <Join />,
  },
  {
    path: '/game/:gameId',
    errorElement: <ErrorBoundary />,
    lazy: () => import('~/routes/game'),
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
            <Toaster />
          </Suspense>
        </QueryClientProvider>
      </TRPCProvider>
    </ThemeProvider>
  );
}
