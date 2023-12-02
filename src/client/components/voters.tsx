import { useMemo } from 'react';

import { Icons } from '~/components/icons';
import { SuitIcon } from '~/components/suit-icon';
import { useGame } from '~/hooks/use-game';
import { cn } from '~/utils/misc';

const POSITIONS = [
  ['col-start-2', 'row-start-1', 'rotate-0', '-bottom-10'],
  ['col-start-2', 'row-start-4', 'rotate-180', '-top-10'],
  ['col-start-3', 'row-start-1', 'rotate-0', '-bottom-10'],
  ['col-start-3', 'row-start-4', 'rotate-180', '-top-10'],
  ['col-start-4', 'row-start-1', 'rotate-0', '-bottom-10'],
  ['col-start-4', 'row-start-4', 'rotate-180', '-top-10'],
  ['col-start-5', 'row-start-1', 'rotate-0', '-bottom-10'],
  ['col-start-5', 'row-start-4', 'rotate-180', '-top-10'],
  ['col-start-1', 'row-start-2', '-rotate-90', '-right-6 top-6'],
  ['col-start-6', 'row-start-2', 'rotate-90', '-left-6 top-6'],
  ['col-start-1', 'row-start-3', '-rotate-90', '-right-6'],
  ['col-start-6', 'row-start-3', 'rotate-90', '-left-6'],
  ['col-start-1', 'row-start-1', '-rotate-45', 'right-0'],
  ['col-start-1', 'row-start-4', '-rotate-[135deg]', 'right-0'],
  ['col-start-6', 'row-start-1', 'rotate-45', 'left-0'],
  ['col-start-6', 'row-start-4', 'rotate-[135deg]', 'left-0'],
];

export function Voters() {
  const game = useGame();

  const voters = useMemo(
    () =>
      game.players
        .filter((player) => !player.isSpectator)
        .map((player, index) => ({
          player,
          position: POSITIONS[index],
        })),
    [game.players],
  );

  return voters.map(
    ({ player, position: [colStart, rowStart, chairRotate, cardPosition] }) => (
      <div
        key={player.id}
        className={cn(
          'flex flex-col items-center gap-2 relative animate-in fade-in',
          colStart,
          rowStart,
          rowStart === 'row-start-1' && 'flex-col-reverse',
        )}
      >
        <div
          className={cn(
            'absolute z-20 h-14 w-10 bg-yellow-200 rounded shadow-lg items-center justify-center animate-in spin-in-45',
            cardPosition,
            game.isRevealed && player.vote ? 'flex' : 'hidden',
          )}
        >
          <SuitIcon
            vote={player.vote}
            className="absolute left-1 top-1 h-2.5"
          />
          <p className="text-lg font-bold text-black">{player.vote}</p>
          <SuitIcon
            vote={player.vote}
            className="absolute bottom-1 right-1 h-2.5"
          />
        </div>
        <Icons.chair
          className={cn(
            'flex-1 fill-slate-300 dark:fill-slate-500 transition-colors',
            chairRotate,
            player.vote && 'fill-red-700 dark:fill-red-800',
          )}
        />
        <p className="line-clamp-1 font-bold">{player.name}</p>
      </div>
    ),
  );
}
