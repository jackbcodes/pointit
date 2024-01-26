import { zodResolver } from '@hookform/resolvers/zod';
import { TRPCClientError } from '@trpc/client';
import { ArrowRight, Eye, Loader2, LucideIcon, Vote } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { Header } from '~/components/header';
import { Spinner } from '~/components/spinner';
import { Button } from '~/components/ui/button';
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
import { useToast } from '~/components/ui/use-toast';
import { api } from '~/utils/api';
import { cn } from '~/utils/misc';

export function Join() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const gameQuery = api.game.getById.useQuery(gameId!);
  const userQuery = api.user.get.useQuery();

  const isUserInGame = Boolean(gameId === userQuery.data?.gameId);

  if (gameQuery.isLoading || userQuery.isLoading) return <Spinner />;

  if (isUserInGame) navigate(`/game/${gameId}`, { replace: true });

  return (
    <div className="relative h-screen overflow-hidden bg-background-game">
      <Header />

      <div className="mx-auto mt-8 space-y-8 md:w-96">
        <h1 className="text-center text-2xl font-bold md:text-3xl">
          Join game
        </h1>
        <JoinGameForm
          playerName={userQuery.data?.name}
          isSpectator={userQuery.data?.isSpectator}
        />
      </div>
    </div>
  );
}

const formSchema = z.object({
  playerName: z.string({
    required_error: 'Please enter your name',
  }),
  isSpectator: z.coerce.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface JoinGameFormProps {
  playerName?: string;
  isSpectator?: boolean;
}

function JoinGameForm({ playerName, isSpectator }: JoinGameFormProps) {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const joinGame = api.game.join.useMutation();

  const defaultValues: Partial<FormValues> = {
    playerName: playerName ?? '',
    isSpectator: isSpectator ?? false,
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
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          error instanceof TRPCClientError
            ? error.message
            : 'There was an error joining the game, please try again',
      });
    }
  }

  return (
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
              <FormItem>
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
