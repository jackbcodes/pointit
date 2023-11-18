import { Text } from '@chakra-ui/react';
import { ControllerRenderProps } from 'react-hook-form';

import { RadioCardGroup, RadioCard } from '~/components/radio-card-group';
import { DEFAULT_VOTING_SYSTEMS, DefaultVotingSystemName } from '~/constants';

export type VotingSystemRadioCardsProps = Pick<
  ControllerRenderProps,
  'onChange' | 'name' | 'value'
> & {
  defaultValue?: DefaultVotingSystemName;
};

export const VotingSystemRadioCards = ({
  defaultValue,
  onChange,
  name,
  value,
}: VotingSystemRadioCardsProps) => (
  <RadioCardGroup
    defaultValue={defaultValue}
    spacing="3"
    onChange={onChange}
    name={name}
    value={value}
  >
    {Object.entries(DEFAULT_VOTING_SYSTEMS).map(([name, values]) => (
      <RadioCard key={name} value={name}>
        <Text color="emphasized" fontWeight="medium" fontSize="sm">
          {name}
        </Text>
        <Text color="muted" fontSize="sm">
          {values.join(', ')}
        </Text>
      </RadioCard>
    ))}
  </RadioCardGroup>
);
