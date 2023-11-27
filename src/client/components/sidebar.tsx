import { useMemo } from 'react';

import {
  ExternalLink,
  Eye,
  LogOut,
  MoreHorizontal,
  Pencil,
  User,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Icons } from '~/components/icons';
import { RevealButton } from '~/components/reveal-button';
import { Button, ButtonProps } from '~/components/ui/button';
import { Toggle } from '~/components/ui/toggle';
import { useGame } from '~/hooks/use-game';
import { usePlayer } from '~/hooks/use-player';
import { api } from '~/utils/api';
import { cn } from '~/utils/misc';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

export function Sidebar() {
  const game = useGame();
  const player = usePlayer();

  const toggleSpectatorMode = api.player.toggleSpectatorMode.useMutation();

  const spectators = useMemo(
    () => game.players.filter(({ isSpectator }) => isSpectator),
    [game.players],
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-6 overflow-hidden">
        <Icons.logo className="h-9" />
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <Pencil className="mr-2 h-4 w-4" />
            Change name
          </Button>
          <Toggle
            className="w-full justify-start px-4"
            aria-label="Toggle player mode"
            pressed={player.isSpectator}
            onPressedChange={async () =>
              await toggleSpectatorMode.mutateAsync()
            }
          >
            <Eye className="mr-2 h-4 w-4" />
            Spectator mode
          </Toggle>
          <LeaveButton className="lg:hidden" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold tracking-widest text-primary">
              VOTING ON
            </p>
            <div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ExternalLink className="h-3 w-3" />
                <span className="sr-only">Open external</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-3 w-3" />
                <span className="sr-only">More</span>
              </Button>
            </div>
          </div>
          <div className="space-y-1.5">
            <p className="line-clamp-1 text-sm">
              1528394 | Update copy on results page and do this and that because
              woohoo
            </p>
            <p className="line-clamp-3 text-sm text-muted-foreground">
              1528394 | Update copy on results page and do this and that because
              woohoo. 1528394 | Update copy on results page and do this and that
              because woohoo
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="h-6 text-sm font-bold tracking-widest text-primary">
            SPECTATORS
          </p>
          <div className="grid grid-cols-2  gap-x-4 gap-y-2">
            {spectators.map((spectator) => (
              <div
                className="flex animate-in slide-in-from-left"
                key={spectator.id}
              >
                <User className="mr-2 h-4 w-4 flex-none" />
                <p className="truncate text-sm">{spectator.name}</p>
              </div>
            ))}
            <p className={cn('text-sm', spectators.length > 0 && 'hidden')}>
              No spectators
            </p>
          </div>
        </div>
      </div>
      <div className="hidden space-y-3 lg:block">
        <RevealButton />
        <LeaveButton />
      </div>
    </div>
  );
}

function LeaveButton(props: ButtonProps) {
  const navigate = useNavigate();

  const leaveGame = api.player.leaveGame.useMutation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          {...props}
          variant="ghost"
          className={cn(
            'w-full justify-start text-destructive hover:text-destructive',
            props.className,
          )}
        >
          <LogOut className="mr-2 h-4 w-4 lg:mr-2" />
          <p>Leave game</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Leave game</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to leave this game? You can rejoin at any
            time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await leaveGame.mutateAsync();
              navigate('/');
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
