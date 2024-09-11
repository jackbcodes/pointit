import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { api } from '~/utils/api';

export function useEventSource() {
  const { gameId } = useParams();

  const userQuery = api.user.get.useQuery();
  const utils = api.useUtils();

  const isPlayerInGame = Boolean(gameId === userQuery.data?.gameId);

  useEffect(() => {
    if (!isPlayerInGame) return;

    const evtSource = new EventSource(`/api/game/${gameId}/subscribe`);

    const handleSubscribed = async (event: MessageEvent) => {
      utils.game.getById.setData(gameId!, JSON.parse(event.data));
    };

    const handleMessage = async (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      utils.game.getById.setData(gameId!, (prevData) => {
        if (!prevData) return;

        // Update one player
        if (data.player) {
          const isExistingPlayer = prevData.players.some(
            (player) => player.id === data.player.id,
          );

          if (isExistingPlayer) {
            return {
              ...prevData,
              ...data,
              players: prevData.players.map((player) =>
                player.id === data.player.id
                  ? { ...player, ...data.player }
                  : player,
              ),
            };
          }

          return {
            ...prevData,
            players: [...prevData.players, data.player],
          };
        }

        // Update all players
        if (data.players) {
          return {
            ...prevData,
            ...data,
            players: prevData.players.map((player) => ({
              ...player,
              ...data.players,
            })),
          };
        }

        // Remove player
        if (data.isLeaveGame) {
          return {
            ...prevData,
            players: prevData.players.filter((player) => player.id !== data.id),
          };
        }

        // Update game
        return {
          ...prevData,
          ...data,
        };
      });
    };

    evtSource.addEventListener('subscribed', handleSubscribed);
    evtSource.addEventListener('message', handleMessage);

    return () => {
      evtSource.removeEventListener('subscribed', handleSubscribed);
      evtSource.removeEventListener('message', handleMessage);
      evtSource.close();
    };
  }, [isPlayerInGame]);
}
