import { useMemo } from 'react';

import { Icons } from '~/components/icons';
import { useGame } from '~/hooks/use-game';
import { cn } from '~/utils/misc';

interface SuitIconProps extends React.HTMLAttributes<SVGElement> {
  vote: string;
}

export function SuitIcon({ vote, ...props }: SuitIconProps) {
  const game = useGame();

  const index = useMemo(
    () => game.votingSystem.values.indexOf(vote),
    [game.votingSystem.values, vote],
  );

  switch (index % 4) {
    case 1: {
      return (
        <Icons.diamond
          {...props}
          className={cn('fill-red-800', props.className)}
        />
      );
    }
    case 2: {
      return (
        <Icons.club
          {...props}
          className={cn('fill-slate-800', props.className)}
        />
      );
    }
    case 3: {
      return (
        <Icons.heart
          {...props}
          className={cn('fill-red-800', props.className)}
        />
      );
    }
    default: {
      return (
        <Icons.spade
          {...props}
          className={cn('fill-slate-800', props.className)}
        />
      );
    }
  }
}
