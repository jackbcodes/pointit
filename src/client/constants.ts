export enum DefaultVotingSystemName {
  FIBONACCI = 'Fibonacci',
  TSHIRT = 'TShirt',
}

export const DEFAULT_VOTING_SYSTEMS = {
  [DefaultVotingSystemName.FIBONACCI]: [
    '0',
    '1',
    '2',
    '3',
    '5',
    '8',
    '13',
    '21',
    '?',
    '☕️',
  ],
  [DefaultVotingSystemName.TSHIRT]: [
    'XXS',
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL',
    '?',
    '☕️',
  ],
};
