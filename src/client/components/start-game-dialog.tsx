import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components//ui/form';
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
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { useToast } from '~/components/ui/use-toast';
import { api } from '~/utils/api';
import { cn } from '~/utils/misc';

const DEFAULT_VOTING_SYSTEMS = {
  fibonacci: ['0', '1', '2', '3', '5', '8', '13', '21', '?', '☕️'],
  't-shirt': ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '?', '☕️'],
};

const formSchema = z.object({
  playerName: z.string({
    required_error: 'Please enter your name',
  }),
  votingSystemName: z.enum(['fibonacci', 't-shirt']),
});

type FormValues = z.infer<typeof formSchema>;

interface StartGameDialogProps {
  playerName?: string;
  isLoading: boolean;
}

export function StartGameDialog({
  playerName,
  isLoading,
}: StartGameDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const createGame = api.game.create.useMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: {
      playerName: playerName ?? '',
      votingSystemName: 'fibonacci',
    },
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
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was an error starting the game, please try again',
      });
      console.error(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" disabled={isLoading}>
          <Loader2
            className={cn(
              'mr-2 h-4 w-4 animate-spin hidden',
              isLoading && 'block',
            )}
          />
          Start game <ArrowRight className="ml-2 size-4" />
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
                <FormItem>
                  <FormLabel>Voting system</FormLabel>
                  <FormMessage />
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <VotingSystemRadioGroupItem
                      value="fibonacci"
                      name="Fibonacci"
                      values="0, 1, 2, 3, 5, 8, 13, 21, ?, ☕️"
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
