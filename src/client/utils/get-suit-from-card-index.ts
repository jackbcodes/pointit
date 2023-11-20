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
