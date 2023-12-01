import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

import { useGame } from '~/hooks/use-game';
import { usePlayer } from '~/hooks/use-player';
import { api } from '~/utils/api';

import { Icons } from './icons';

export function VotePicker() {
  const game = useGame();
  const player = usePlayer();

  const vote = api.player.vote.useMutation();

  return (
    <ToggleGroupPrimitive.Root
      type="single"
      className="flex flex-wrap gap-4"
      aria-label="Choose vote"
      value={player.vote}
      onValueChange={async (value) => await vote.mutateAsync(value)}
    >
      {game.votingSystem.values.map((value) => (
        <ToggleGroupPrimitive.Item
          key={value}
          value={value}
          className="relative flex h-20 w-14 items-center justify-center rounded-lg border-4 border-primary text-primary transition-colors hover:opacity-90 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary data-[state=disabled]:text-primary-foreground data-[state=on]:text-primary-foreground"
        >
          <Icons.diamond className="absolute left-1 top-1 h-3 opacity-40" />
          <p className="text-2xl font-bold ">{value}</p>
          <Icons.diamond className="absolute bottom-1 right-1 h-3 opacity-40" />
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  );
}
