import { useMemo } from 'react';

import { useGame } from '~/hooks/use-game';

import { SuitIcon } from './suit-icon';

export function Results() {
  const game = useGame();

  const allVotes = useMemo(
    () => game.players.map((player) => player.vote).filter(Boolean),
    [game],
  );

  const occurrences = countOccurrences(allVotes);

  const occurrencesKeys = Object.keys(occurrences);

  const numberVotes = allVotes.map(Number).filter(Boolean);

  // Calculate average for only numbers (e.g. not t-shirt sizes or '?' cards)
  const average = calculateAverage(numberVotes);

  return (
    <div className="flex items-center gap-8 animate-in slide-in-from-bottom">
      <div className="flex flex-wrap  gap-4">
        {occurrencesKeys.map((vote) => (
          <div key={vote} className="space-y-1">
            <p className="text-center">x{occurrences[vote]}</p>
            <div className="relative flex h-20 w-14 items-center justify-center rounded-lg border-4 border-primary text-primary">
              <SuitIcon
                vote={vote}
                className="absolute left-1 top-1 h-3 fill-current opacity-40"
              />
              <p className="text-2xl font-bold ">{vote}</p>
              <SuitIcon
                vote={vote}
                className="absolute bottom-1 right-1 h-3 fill-current opacity-40"
              />
            </div>
          </div>
        ))}
      </div>
      {numberVotes.length > 0 && (
        <div className="space-y-2 text-center">
          <p className="text-xl">Average:</p>
          <p className="text-4xl font-bold">
            {Number.parseFloat(average.toFixed(1))}
          </p>
        </div>
      )}
    </div>
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
