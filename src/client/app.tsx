import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Game from '~/routes/game';
import Root from '~/routes/root';
import { Fonts } from '~/styles/fonts';
import { theme } from '~/styles/theme';
import { TRPCProvider, trpcClient } from '~/utils/api';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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
    <TRPCProvider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Fonts />
          <RouterProvider router={router} />
        </ChakraProvider>
      </QueryClientProvider>
    </TRPCProvider>
  );
}
