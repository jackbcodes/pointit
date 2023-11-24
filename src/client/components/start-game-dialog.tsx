import { zodResolver } from '@hookform/resolvers/zod';
import { TRPCClientError } from '@trpc/client';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { api } from '~/utils/api';
import { cn } from '~/utils/misc';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

const DEFAULT_VOTING_SYSTEMS = {
  fibonacci: ['0', '1', '2', '3', '5', '8', '13', '21', '?', '☕️'],
  't-shirt': ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '?', '☕️'],
};

const formSchema = z.object({
  gameName: z.string({
    required_error: "Please enter the game's name",
  }),
  playerName: z.string({
    required_error: 'Please enter your name',
  }),
  votingSystemName: z.enum(['fibonacci', 't-shirt']),
});

type FormValues = z.infer<typeof formSchema>;

export function StartGameDialog() {
  const navigate = useNavigate();
  const playerQuery = api.player.get.useQuery();
  const createGame = api.game.create.useMutation();

  const defaultValues: Partial<FormValues> = {
    playerName: playerQuery.data?.name,
    votingSystemName: 'fibonacci',
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(formData: FormValues) {
    try {
      const gameId = await createGame.mutateAsync({
        ...formData,
        votingSystem: {
          name: formData.votingSystemName,
          values: DEFAULT_VOTING_SYSTEMS[formData.votingSystemName],
        },
      });

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
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">
          Start game <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start game</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="gameName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Game&apos;s name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="votingSystemName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Voting system</FormLabel>
                  <FormMessage />
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <VotingSystemRadioGroupItem
                      value="fibonacci"
                      name="Fibonacci"
                      values="0, 1, 2, 3, 5, 8, 13, 21, 34, ?, ☕️"
                    />
                    <VotingSystemRadioGroupItem
                      value="t-shirt"
                      name="T-shirt"
                      values="XXS, XS, S, M, L, XL, XXL, ?, ☕️"
                    />
                  </RadioGroup>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                <Loader2
                  className={cn(
                    'mr-2 h-4 w-4 animate-spin hidden',
                    form.formState.isSubmitting && 'block',
                  )}
                />
                Let&apos;s go
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

interface VotingSystemRadioItemProps {
  value: string;
  name: string;
  values: string;
}

function VotingSystemRadioGroupItem({
  value,
  name,
  values,
}: VotingSystemRadioItemProps) {
  return (
    <FormItem>
      <FormLabel className="[&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:ring-1 [&:has([data-state=checked])>div]:ring-ring">
        <FormControl>
          <RadioGroupItem value={value} className="sr-only" />
        </FormControl>
        <div className="space-y-1 rounded-md border border-input p-4 transition-all hover:cursor-pointer">
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="text-sm text-muted-foreground">{values}</p>
        </div>
      </FormLabel>
    </FormItem>
  );
}
