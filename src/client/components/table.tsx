import { useMemo } from 'react';

import { useGame } from '~/hooks/use-game';
import { cn } from '~/utils/misc';

import { Icons } from './icons';

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

// TODO: Dark mode colours & dynamic card suit

export function Table() {
  const game = useGame();

  const voters = useMemo(
    () => game.players.filter((player) => !player.isSpectator),
    [game.players],
  );

  return (
    <div className="grid max-w-xl grid-cols-6 grid-rows-4 items-center gap-3">
      <img
        src="/assets/table.png"
        className="col-span-4 col-start-2 row-span-2 row-start-2"
        alt="table"
      />

      {POSITIONS.map(([colStart, rowStart, chairRotate, cardPosition], i) => {
        const player = voters[i];
        if (!player) return;

        return (
          <div
            key={player.id ?? i}
            className={cn(
              'flex flex-col items-center gap-2 relative',
              colStart,
              rowStart,
              rowStart === 'row-start-1' && 'flex-col-reverse',
            )}
          >
            <div
              className={cn(
                'absolute z-20 h-14 w-10 bg-yellow-200 rounded shadow-lg  items-center justify-between p-1 hidden',
                cardPosition,
                game.isRevealed && 'flex',
              )}
            >
              <Icons.diamond className="h-2.5 self-start" />
              <p className="text-lg font-bold">1</p>
              <Icons.diamond className="h-2.5 self-end" />
            </div>
            <Icons.chair
              className={cn(
                'flex-1 fill-slate-300 transition-colors',
                chairRotate,
                player.vote && 'fill-red-700',
              )}
            />
            <p className="line-clamp-1 font-bold">{player.name}</p>
          </div>
        );
      })}
    </div>
  );
}
