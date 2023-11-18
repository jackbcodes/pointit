import { Icon, Stack, Text } from '@chakra-ui/react';
import { User, Users } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';

import { RadioCardGroup, RadioCard } from '~/components/radio-card-group';

export type AllOrHostRadioCardsProps = Pick<
  ControllerRenderProps,
  'onChange' | 'name' | 'value'
> & {
  defaultValue: 'all' | 'host';
};

export const AllOrHostRadioCards = ({
  defaultValue,
  onChange,
  name,
  value,
}: AllOrHostRadioCardsProps) => (
  <RadioCardGroup
    defaultValue={defaultValue}
    spacing="3"
    onChange={onChange}
    name={name}
    value={value}
  >
    <RadioCard value="all">
      <Stack direction="row">
        <Icon as={Users} color="muted" />
        <Text color="emphasized" fontWeight="medium" fontSize="sm">
          All players
        </Text>
      </Stack>
    </RadioCard>
    <RadioCard value="host">
      <Stack direction="row">
        <Icon as={User} color="muted" />
        <Text color="emphasized" fontWeight="medium" fontSize="sm">
          Host only
        </Text>
      </Stack>
    </RadioCard>
  </RadioCardGroup>
);
