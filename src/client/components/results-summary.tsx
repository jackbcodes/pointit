import { useMemo } from 'react';

import { SimpleGrid, Stack, Text, useBreakpointValue } from '@chakra-ui/react';

import { useGame } from '~/hooks/use-game';
import { getSuitFromCardIndex } from '~/utils/get-suit-from-card-index';

import { BigCard } from './big-card';

export function ResultsSummary() {
  const game = useGame();
  const isLgBreakpoint = useBreakpointValue({ base: false, lg: true });

  const allVotes = useMemo(
    () => game.players.map((player) => player.vote).filter(Boolean),
    [game],
  );

  const occurrences = countOccurrences(allVotes);

  const occurrencesKeys = Object.keys(occurrences);

  const cardsColumns = isLgBreakpoint
    ? occurrencesKeys.length
    : occurrencesKeys.length === 1
      ? 1
      : 2;

  const numberVotes = allVotes.map(Number).filter(Boolean);

  // Calculate average for only numbers (e.g. not t-shirt sizes or '?' cards)
  const average = calculateAverage(numberVotes);

  return (
    <Stack direction="row" spacing="10" alignItems="flex-start">
      <SimpleGrid columns={cardsColumns} spacing={6}>
        {occurrencesKeys.map((points) => (
          <Stack key={points} align="center">
            <BigCard
              points={points}
              suit={getSuitFromCardIndex(
                game.votingSystem.values.indexOf(points),
              )}
            />
            <Text textAlign="center">
              {occurrences[points]} Vote{occurrences[points] > 1 ? 's' : ''}
            </Text>
          </Stack>
        ))}
      </SimpleGrid>
      {numberVotes.length > 0 && (
        <Stack align="center">
          <Text fontSize={{ base: 'lg', lg: 'xl' }}>Average:</Text>
          <Text fontSize={{ base: '3xl', lg: '4xl' }} fontWeight="semibold">
            {Number.parseFloat(average.toFixed(1))}
          </Text>
        </Stack>
      )}
    </Stack>
  );
}

function countOccurrences(arr: string[]): Record<string, number> {
  const occurrences: Record<string, number> = {};

  for (const item of arr) {
    if (occurrences[item]) {
      occurrences[item]++;
    } else {
      occurrences[item] = 1;
    }
  }

  return occurrences;
}

function calculateAverage(numbers: number[]): number {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const average = numbers.length > 0 ? sum / numbers.length : 0;
  return average;
}
