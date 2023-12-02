import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { TRPCClientError } from '@trpc/client';
import { Loader2, Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { api } from '~/utils/api';
import { cn, emptyStringToUndefined } from '~/utils/misc';

const formSchema = z.object({
  playerName: emptyStringToUndefined.pipe(
    z.string({
      required_error: 'Please enter your name',
    }),
  ),
});

type FormValues = z.infer<typeof formSchema>;

interface ChangeNameDialogProps {
  playerName: string;
}

export function ChangeNameDialog({ playerName }: ChangeNameDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const changeName = api.player.changeName.useMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: {
      playerName,
    },
  });

  async function onSubmit(formData: FormValues) {
    try {
      await changeName.mutateAsync(formData.playerName);
      setIsOpen(false);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <Pencil className="mr-2 h-4 w-4" />
          Change name
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change name</DialogTitle>
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

            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                <Loader2
                  className={cn(
                    'mr-2 h-4 w-4 animate-spin hidden',
                    form.formState.isSubmitting && 'block',
                  )}
                />
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
