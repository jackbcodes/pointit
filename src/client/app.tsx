import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Game from '~/routes/game';
import Root from '~/routes/root';
import RootOld from '~/routes/root-old';
import { theme } from '~/styles/theme';
import { TRPCProvider, trpcClient } from '~/utils/api';

import { ThemeProvider } from './components/theme-provider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/old',
    element: <RootOld />,
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
          <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
          </ChakraProvider>
        </QueryClientProvider>
      </TRPCProvider>
    </ThemeProvider>
  );
}
