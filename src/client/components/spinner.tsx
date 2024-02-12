import { Loader2 } from 'lucide-react';

export function Spinner() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Loader2 className="size-6 animate-spin" />
      <p className="mt-2 text-lg">Shuffling cards...</p>
    </div>
  );
}
