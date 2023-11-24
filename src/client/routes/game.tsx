import { useEffect, useMemo } from 'react';

import { Container, Flex, Heading, Show, Stack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { ColorModeButton } from '~/components/color-mode-button';
import { LoadingGameSpinner } from '~/components/loading-game-spinner';
import { JoinGameModal } from '~/components/modals/join-game-modal';
import { ResultsSummary } from '~/components/results-summary';
import { Sidebar } from '~/components/sidebar';
import { Table } from '~/components/table';
import { VotePicker } from '~/components/vote-picker';
import { api } from '~/utils/api';

export default function Game() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const playerQuery = api.player.get.useQuery();
  const gameQuery = api.game.getById.useQuery(gameId!);
  const utils = api.useUtils();

  const isPlayerInGame = Boolean(gameId === playerQuery.data?.gameId);
  const isLoading = gameQuery.isLoading || playerQuery.isLoading;

  useEffect(() => {
    if (!isPlayerInGame && !isLoading) return;
    navigate(`/join/${gameId}`);
  }, [isPlayerInGame]);

  if (gameQuery.isLoading || playerQuery.isLoading)
    return <LoadingGameSpinner />;

  // TODO: handle no game
  // if (!gameQuery.data) {
  //   navigate('/');
  //   return;
  // }

  if (gameQuery.data) {
    if (!isPlayerInGame)
      return (
        <JoinGameModal
          name={playerQuery.data?.name}
          isSpectator={playerQuery.data?.isSpectator}
        />
      );

    return (
      <Flex
        as="section"
        direction={{ base: 'column', lg: 'row' }}
        minH="100vh"
        bgColor={bgColor}
      >
        {/* {isDesktop ? <Sidebar /> : <GameNavbar />} */}
        <Sidebar />
        <Container py={{ base: 4, md: 8 }} display="flex">
          <Stack
            spacing={{ base: 6, lg: 0.5 }}
            flex={1}
            justifyContent="space-between"
          >
            <Stack direction="row" justify="space-between" align="center">
              <Heading size={headingSize} fontWeight="medium">
                {gameQuery.data.name}
              </Heading>
              <Stack direction="row">
                {/* <Menu /> */}
                <Show above="lg">
                  <ColorModeButton />
                </Show>
              </Stack>
            </Stack>
            <Stack
              justifyContent="space-between"
              flex={1}
              spacing={{ base: 6, lg: 0 }}
            >
              <Stack align="center">
                <Table />
              </Stack>
              <Stack align="center">
                {gameQuery.data.isRevealed ? (
                  <ResultsSummary />
                ) : (
                  <VotePicker />
                )}
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Flex>
    );
  }
}
