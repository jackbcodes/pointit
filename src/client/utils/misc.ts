import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type CardSuits = 'spade' | 'heart' | 'diamond' | 'club';

export function getSuitFromCardIndex(i: number) {
  const remainderToSuitMap: Record<number, CardSuits> = {
    0: 'spade',
    1: 'heart',
    2: 'diamond',
    3: 'club',
  };

  return remainderToSuitMap[i % 4];
}
