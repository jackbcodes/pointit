import { zodResolver } from '@hookform/resolvers/zod';
import { TRPCClientError } from '@trpc/client';
import { ArrowRight, Eye, Loader2, LucideIcon, Vote } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { ColorModeToggle } from '~/components/color-mode-toggle';
import { Icons } from '~/components/icons';
import { Button, buttonVariants } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { api } from '~/utils/api';
import { cn } from '~/utils/misc';

const formSchema = z.object({
  playerName: z.string({
    required_error: 'Please enter your name',
  }),
  isSpectator: z.coerce.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Join() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  // TODO: Check if player is already in game
  // TODO: Get join game functionality working

  const playerQuery = api.player.get.useQuery();
  const joinGame = api.game.join.useMutation();

  const defaultValues: Partial<FormValues> = {
    playerName: playerQuery.data?.name,
    isSpectator: playerQuery.data?.isSpectator ?? false,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(formData: FormValues) {
    try {
      await joinGame.mutateAsync({ gameId: gameId!, ...formData });

      navigate(`/game/${gameId}`);
    } catch (error) {
      form.setError('root.serverError', {
        message:
          error instanceof TRPCClientError
            ? error.message
            : 'There was an error joining the game, please try again',
      });
    }
  }

  return (
    <div className="relative h-screen overflow-hidden bg-background-game">
      <div className="container">
        <header className="flex items-center justify-between py-4">
          <Icons.logo className="h-9" />
          <div className="flex items-center space-x-2">
            <a
              href="https:google.com"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                variant: 'ghost',
                size: 'icon',
              })}
            >
              <Icons.gitHub className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <ColorModeToggle />
          </div>
        </header>

        <div className="mx-auto mt-8 space-y-8 md:w-96">
          <div className="space-y-2 text-center md:space-y-3">
            <h1 className="text-2xl font-bold md:text-3xl">Join game</h1>
            <p className="text-muted-foreground">
              Start making refinement sessions slightly less boring
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="playerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isSpectator"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Player mode</FormLabel>
                      <FormMessage />
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={String(field.value)}
                      >
                        <PlayerModeRadioGroupItem
                          value="false"
                          name="Voter"
                          values="You'll be voting on and estimating work items"
                          icon={Vote}
                        />
                        <PlayerModeRadioGroupItem
                          value="true"
                          name="Spectator"
                          values="You're coming along for the ride but not voting"
                          icon={Eye}
                        />
                      </RadioGroup>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="mt-6 w-full"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                <Loader2
                  className={cn(
                    'mr-2 h-4 w-4 animate-spin hidden',
                    form.formState.isSubmitting && 'block',
                  )}
                />
                Let&apos;s go
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

interface PlayerModeRadioGroupItemProps {
  value: string;
  name: string;
  values: string;
  icon: LucideIcon;
}

function PlayerModeRadioGroupItem({
  value,
  name,
  values,
  icon: Icon,
}: PlayerModeRadioGroupItemProps) {
  return (
    <FormItem>
      <FormLabel className="[&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:ring-1 [&:has([data-state=checked])>div]:ring-ring">
        <FormControl>
          <RadioGroupItem value={value} className="sr-only" />
        </FormControl>
        <div className="flex items-start space-x-4 rounded-md border border-input bg-background p-4 transition-all hover:cursor-pointer hover:text-accent-foreground">
          <Icon className="h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-sm text-muted-foreground">{values}</p>
          </div>
        </div>
      </FormLabel>
    </FormItem>
  );
}
