import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Loader2, Plus } from 'lucide-react';
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

const formSchema = z.object({
  title: z.string({
    required_error: 'Please enter the title',
  }),
  description: z.string({
    required_error: 'Please enter a description',
  }),
  url: z.string().url().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditWorkItemDialogProps {
  title?: string;
  description?: string;
  url?: string;
}

export function EditWorkItemDialog({
  title,
  description,
  url,
}: EditWorkItemDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const add = api.workItem.add.useMutation();

  const defaultValues: Partial<FormValues> = {
    title,
    description,
    url,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(formData: FormValues) {
    try {
      await add.mutateAsync(formData);

      setIsOpen(false);
    } catch {
      form.setError('root.serverError', {
        message: 'There was an unexpected error, please try again',
      });
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          {title ? <Edit className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
          <span className="sr-only">Edit work item</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title ? 'Edit' : 'Add'} work item</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
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
