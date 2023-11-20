import { useMemo } from 'react';

import {
  Flex,
  Grid,
  GridItem,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';

import { Player } from '~/components/player';
import { useGame } from '~/hooks/use-game';

export function Table() {
  const game = useGame();

  const tableSrc = useBreakpointValue({
    base: '/assets/table-sm.svg',
    lg: '/assets/table-lg.svg',
  });

  const gridTemplateColumns = useBreakpointValue({
    base: '90px 90px 90px 90px',
    lg: '150px 150px 150px 150px 150px 150px',
  });

  const gridTemplateRows = useBreakpointValue({
    base: '72px 72px 72px 72px 72px 72px',
    lg: '150px 150px 150px 150px',
  });

  const templateAreas = useBreakpointValue({
    base: `"player-15 player-7 player-5 player-13"
    "player-11 table table player-9"
    "player-3 table table player-1"
    "player-4 table table player-2"
    "player-12 table table player-10"
    "player-16 player-8 player-6 player-14"`,
    lg: `"player-13 player-9 player-1 player-2 player-10 player-14"
    "player-5 table table table table player-6"
    "player-7 table table table table player-8"
    "player-15 player-11 player-3 player-4 player-12 player-16"
  `,
  });

  const voters = useMemo(
    () => game.players.filter((player) => !player.isSpectator),
    [game.players],
  );

  return (
    <Grid
      gridTemplateColumns={gridTemplateColumns}
      gridTemplateRows={gridTemplateRows}
      templateAreas={templateAreas}
    >
      {voters.map((player, i) => {
        return (
          <GridItem area={`player-${i + 1}`} zIndex={1} key={i}>
            <Flex h="100%" w="100%" alignItems="center" justifyContent="center">
              <Player name={player.name} vote={player.vote} position={i + 1} />
            </Flex>
          </GridItem>
        );
      })}
      <GridItem area={'table'}>
        <Flex h="100%" alignItems="center" justifyContent="center">
          <Image h="95%" src={tableSrc} alt="Table" mt={2} />
        </Flex>
      </GridItem>
    </Grid>
  );
}
