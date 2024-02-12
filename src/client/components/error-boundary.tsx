import { Home } from 'lucide-react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { Header } from '~/components/header';
import { buttonVariants } from '~/components/ui/button';
import { isTRPCClientError } from '~/utils/api';
import { cn } from '~/utils/misc';

export function ErrorBoundary() {
  const error = useRouteError();

  const isNotFound =
    (isRouteErrorResponse(error) && error.status === 404) ||
    (isTRPCClientError(error) && error.data?.code === 'NOT_FOUND');

  return (
    <div className="h-screen">
      <Header />

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
              ? "Sorry, we can't find this page. Please check you have the correct game link."
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
            <Home className="mr-2 size-4" /> Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
