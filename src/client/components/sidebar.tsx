import { useMemo } from 'react';

import { ExternalLink, Eye, LogOut, Trash2, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { ChangeNameDialog } from '~/components/change-name-dialog';
import { EditWorkItemDialog } from '~/components/edit-work-item-dialog';
import { Icons } from '~/components/icons';
import { RevealButton } from '~/components/reveal-button';
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
} from '~/components/ui/alert-dialog';
import { Button, ButtonProps, buttonVariants } from '~/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '~/components/ui/hover-card';
import { Toggle } from '~/components/ui/toggle';
import { useGame } from '~/hooks/use-game';
import { usePlayer } from '~/hooks/use-player';
import { api } from '~/utils/api';
import { cn } from '~/utils/misc';

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
          <ChangeNameDialog playerName={player.name} />
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
          <LeaveGameAlertDialog className="lg:hidden" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold tracking-widest text-primary">
              VOTING ON
            </p>
            <div className="flex gap-1">
              <EditWorkItemDialog {...game.workItem} />
              <RemoveWorkItemAlertDialog />
            </div>
          </div>
          <div>
            <HoverCard openDelay={100}>
              <HoverCardTrigger
                className={cn(
                  'group space-y-1.5 hover:cursor-pointer hidden',
                  game.workItem && 'block',
                )}
              >
                <p className="line-clamp-1 text-sm underline-offset-4 group-hover:underline">
                  {game.workItem?.title}
                </p>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {game.workItem?.description}
                </p>
              </HoverCardTrigger>
              <HoverCardContent className="relative space-y-2">
                <div className="flex justify-between">
                  <div className="space-y-1 whitespace-normal">
                    <p className="text-sm font-bold">Title</p>
                    <p className="text-sm">{game.workItem?.title}</p>
                  </div>
                  <a
                    href={game.workItem?.url}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({
                        variant: 'ghost',
                        size: 'icon',
                      }),
                      'h-6 w-6 hidden',
                      game.workItem?.url && 'inline-flex',
                    )}
                  >
                    <ExternalLink className="h-3" />
                    <span className="sr-only">Open work item</span>
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">Description</p>
                  <p className="text-sm">{game.workItem?.description}</p>
                </div>
              </HoverCardContent>
            </HoverCard>
            <p className={cn('text-sm', game.workItem?.title && 'hidden')}>
              No work item added
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
        <LeaveGameAlertDialog />
      </div>
    </div>
  );
}

function LeaveGameAlertDialog(props: ButtonProps) {
  const navigate = useNavigate();

  const leaveGame = api.player.leaveGame.useMutation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          {...props}
          variant="ghost"
          className={cn(
            'w-full justify-start text-destructive dark:text-red-500 hover:text-destructive',
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
            Leave
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function RemoveWorkItemAlertDialog() {
  const game = useGame();

  const remove = api.workItem.remove.useMutation();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant="ghost"
          size="icon"
          className={cn('h-6 w-6', !game.workItem?.title && 'hidden')}
        >
          <Trash2 className="h-3" />
          <span className="sr-only">Remove work item</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove work item</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove this work item? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={async () => await remove.mutateAsync()}>
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
