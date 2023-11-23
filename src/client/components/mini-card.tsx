import { Flex, Show, Text, useBreakpointValue } from '@chakra-ui/react';

import { SuitIcon } from '~/components/suit-icon';
import { CardSuits } from '~/utils/misc';

export interface MiniCardProps {
  points: string;
  suit: CardSuits;
}

export function MiniCard({ points, suit }: MiniCardProps) {
  const color = ['diamond', 'heart'].includes(suit) ? '#A1312D' : '#31312F';
  const CardSuitIcon = () => <SuitIcon color={color} suit={suit} isMini />;

  const height = useBreakpointValue({ base: '40px', lg: '80px' });
  const width = useBreakpointValue({ base: '28px', lg: '56px' });
  const padding = useBreakpointValue({ base: '1px', lg: '5px' });

  return (
    <Flex
      _hover={{ transform: `rotate(2deg)` }}
      boxShadow={'lg'}
      h={height}
      w={width}
      p={padding}
      bgColor="#FAEE98"
      borderRadius={5}
      direction={['row', 'column']}
      justifyContent={['center', 'space-between']}
      alignItems={['center', 'unset']}
    >
      <Show above="lg">
        <Flex>
          <CardSuitIcon />
        </Flex>
      </Show>
      <Text
        align="center"
        fontSize={{ base: 'xl', lg: '2xl' }}
        fontWeight="semibold"
        color="#31312F"
      >
        {points}
      </Text>
      <Show above="lg">
        <Flex justifyContent="flex-end">
          <CardSuitIcon />
        </Flex>
      </Show>
    </Flex>
  );
}
