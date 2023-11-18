import { useParams } from 'react-router-dom';

import { api } from '~/utils/api';

// Use only where we know game data must exists i.e. not on game page
export const useGame = () => {
  const { gameId } = useParams();
  const gameQuery = api.game.getById.useQuery(gameId!);

  return gameQuery.data!;
};
