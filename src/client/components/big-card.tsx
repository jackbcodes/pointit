import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

import { SuitIcon } from '~/components/suit-icon';

export interface CardProps {
  points: string;
  isSelected?: boolean;
  onClick?: () => Promise<void>;
  disabled?: boolean;
  suit: 'heart' | 'diamond' | 'club' | 'spade';
}

export function BigCard({
  points,
  isSelected,
  onClick,
  disabled,
  suit,
}: CardProps) {
  const fontColor = useColorModeValue('white', 'gray.800');
  const defaultColor = useColorModeValue('green.500', 'green.200');
  const selectedHeartColor = useColorModeValue('white', 'green.800');
  const boxShadow = useColorModeValue('md', 'md-dark');

  const CardSuitIcon = () => (
    <SuitIcon
      color={isSelected ? selectedHeartColor : '#5D9759'}
      suit={suit}
      opacity="0.5"
    />
  );

  return (
    <Flex
      _hover={
        disabled
          ? {}
          : {
              transform: `scale(1.05)`,
              boxShadow: !isSelected && disabled ? 'unset' : boxShadow,
            }
      }
      filter={`opacity(${disabled && !isSelected ? '40' : '100'}%)`}
      cursor={disabled ? 'unset' : 'pointer'}
      h="95px"
      w="67px"
      p="6px"
      border="4px solid"
      borderColor={defaultColor}
      borderRadius={10}
      onClick={disabled ? undefined : onClick}
      backgroundColor={isSelected ? defaultColor : 'bg-surface'}
      direction="column"
      justifyContent="space-between"
      transition="all 0.2s"
    >
      <Flex>
        <CardSuitIcon />
      </Flex>
      <Text
        align="center"
        fontSize="2xl"
        fontWeight="semibold"
        color={isSelected ? fontColor : defaultColor}
      >
        {points}
      </Text>
      <Flex justifyContent="flex-end">
        <CardSuitIcon />
      </Flex>
    </Flex>
  );
}
