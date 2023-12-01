import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Game from '~/routes/game';
import Join from '~/routes/join';
import Root from '~/routes/root';
import { TRPCProvider, trpcClient } from '~/utils/api';

import { ThemeProvider } from './components/theme-provider';

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
    },
  },
});

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TRPCProvider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </TRPCProvider>
    </ThemeProvider>
  );
}
