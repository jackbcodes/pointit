import { useMemo } from 'react';

import { Button, ButtonProps } from '~/components/ui/button';
import { useGame } from '~/hooks/use-game';
import { api } from '~/utils/api';
import { cn } from '~/utils/misc';

export function RevealButton(props: ButtonProps) {
  const game = useGame();

  const toggleRevealVotes = api.game.toggleRevealVotes.useMutation();

  const isNoVotes = useMemo(
    () => game.players.every(({ vote }) => !vote),
    [game.players],
  );

  return (
    <Button
      onClick={async () => await toggleRevealVotes.mutateAsync()}
      disabled={isNoVotes}
      className={cn('lg:w-full', props.className)}
    >
      {game.isRevealed ? 'Reset' : 'Reveal'}
    </Button>
  );
}
