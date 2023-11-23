import { SimpleGrid, Text, useBreakpointValue, VStack } from '@chakra-ui/react';

import { BigCard } from '~/components/big-card';
import { useGame } from '~/hooks/use-game';
import { usePlayer } from '~/hooks/use-player';
import { api } from '~/utils/api';
import { getSuitFromCardIndex } from '~/utils/misc';

export function VotePicker() {
  const game = useGame();
  const player = usePlayer();

  const vote = api.player.vote.useMutation();

  const columns = useBreakpointValue({
    base: 4,
    lg: game.votingSystem.values.length,
  });

  return (
    <VStack spacing={4} alignItems="flex-start">
      <Text
        as="h2"
        fontSize="lg"
        fontWeight="bold"
        opacity={player.isSpectator ? 0.4 : 1}
      >
        Pick your points 👇
      </Text>
      <SimpleGrid columns={columns} spacing={6}>
        {game.votingSystem.values.map((value, i) => (
          <BigCard
            key={i}
            points={value}
            suit={getSuitFromCardIndex(i)}
            isSelected={player.vote === value}
            onClick={async () =>
              await vote.mutateAsync(player.vote === value ? undefined : value)
            }
            disabled={game.isRevealed || player.isSpectator}
          />
        ))}
      </SimpleGrid>
    </VStack>
  );
}
