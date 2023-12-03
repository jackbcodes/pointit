import { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc';
import { Home } from 'lucide-react';

import { ColorModeToggle } from '~/components/color-mode-toggle';
import { GitHubLink } from '~/components/github-link';
import { Icons } from '~/components/icons';
import { buttonVariants } from '~/components/ui/button';
import { cn } from '~/utils/misc';

interface ErrorPageProps {
  code?: TRPC_ERROR_CODE_KEY;
}

export function ErrorPage({ code }: ErrorPageProps) {
  const isNotFound = code === 'NOT_FOUND';

  return (
    <div className="relative h-screen overflow-hidden bg-background-game">
      <div className="container">
        <header className="flex items-center justify-between py-4">
          <Icons.logo className="h-9" />
          <div className="flex items-center space-x-2">
            <GitHubLink />
            <ColorModeToggle />
          </div>
        </header>

        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1
              className={cn(
                'mb-4 text-7xl font-extrabold text-destructive lg:text-9xl',
                isNotFound && 'text-primary',
              )}
            >
              {isNotFound ? '404' : 'Uh oh'}
            </h1>
            <p className="mb-4 text-3xl font-bold">
              {isNotFound ? "Something's missing." : "Something's gone wrong."}
            </p>
            <p className="mb-4 text-lg font-light text-muted-foreground">
              {isNotFound
                ? "Sorry, we can't find that game. Please check you have the correct link."
                : 'Sorry, an unexpected error occurred. Please refresh the page to try again.'}
            </p>
            <a
              href="/"
              className={cn(
                buttonVariants({
                  variant: isNotFound ? 'default' : 'destructive',
                }),
                'mt-4',
              )}
            >
              <Home className="mr-2 h-4 w-4" /> Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
