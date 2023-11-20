import { api } from '~/utils/api';

// Use only where we know player data must exists i.e. not on game page
export function usePlayer() {
  const playerQuery = api.player.get.useQuery();

  return playerQuery.data!;
}
