import { useEffect } from 'react';

import { PanelLeftOpen } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { ResultsSummary } from '~/components/results-summary';
import { RevealButton } from '~/components/reveal-button';
import { Sidebar } from '~/components/sidebar';
import { Spinner } from '~/components/spinner';
import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';
import { VotePicker } from '~/components/vote-picker';
import { Voters } from '~/components/voters';
import { api } from '~/utils/api';

export default function Game() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const playerQuery = api.player.get.useQuery();
  const gameQuery = api.game.getById.useQuery(gameId!);
  const utils = api.useUtils();

  const isPlayerInGame = Boolean(gameId === playerQuery.data?.gameId);

  useEffect(() => {
    if (!isPlayerInGame) return;

    const evtSource = new EventSource(`/api/game/${gameId}/subscribe`);

    const handleSubscribed = async (event: MessageEvent) => {
      utils.game.getById.setData(gameId!, JSON.parse(event.data));
    };

    const handleMessage = async (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      utils.game.getById.setData(gameId!, (prevData) => ({
        ...prevData,
        ...JSON.parse(event.data),
      }));

      const currentPlayer = data.players.find(
        (player) => player.id === playerQuery.data?.id,
      );

      if (currentPlayer) utils.player.get.setData(undefined, currentPlayer);
    };

    evtSource.addEventListener('subscribed', handleSubscribed);
    evtSource.addEventListener('message', handleMessage);

    return () => {
      evtSource.removeEventListener('subscribed', handleSubscribed);
      evtSource.removeEventListener('message', handleMessage);
      evtSource.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlayerInGame]);

  if (gameQuery.data && playerQuery.data) {
    if (!isPlayerInGame) {
      navigate(`/join/${gameId}`);
      return;
    }

    return (
      <div className="bg-background-game">
        <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background px-4 py-2.5 lg:hidden">
          <div className="flex items-center justify-between">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <PanelLeftOpen className="h-5 w-5" />
                  <span className="sr-only">Open sidebar</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Sidebar />
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2">
              <RevealButton size="sm" />
            </div>
          </div>
        </nav>

        <aside className="fixed left-0 top-0 z-40 h-screen w-72 -translate-x-full border-r border-border bg-background px-5 py-6 transition-transform lg:translate-x-0">
          <Sidebar />
        </aside>

        <main className="flex min-h-screen flex-col items-center justify-between p-4 pb-8 pt-24 lg:ml-72 lg:pt-8">
          <div className="grid max-w-xl grid-cols-6 grid-rows-4 items-center gap-3">
            <Voters />
            <img
              src="/assets/table.png"
              className="col-span-4 col-start-2 row-span-2 row-start-2"
              alt="table"
            />
          </div>
          {gameQuery.data.isRevealed ? <ResultsSummary /> : <VotePicker />}
        </main>
      </div>
    );
  }

  if (gameQuery.error) {
    navigate('/');
    return;
  }

  return <Spinner />;
}
