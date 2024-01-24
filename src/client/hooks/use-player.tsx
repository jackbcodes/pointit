import { useMemo } from 'react';

import { useGame } from '~/hooks/use-game';
import { api } from '~/utils/api';

// Use only where we know game and user data must exists i.e. not on game.tsx
export function usePlayer() {
  const userQuery = api.user.get.useQuery();
  const game = useGame();

  const player = useMemo(
    () => game.players.find((player) => player.id === userQuery.data!.id),
    [game.players, userQuery.data],
  );

  return player!;
}
