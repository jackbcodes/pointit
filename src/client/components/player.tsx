import { Box, Flex, FlexboxProps, useBreakpointValue } from '@chakra-ui/react';

import { ChairIcon } from '~/components/chair-icon';
import { MiniCard } from '~/components/mini-card';
import { useGame } from '~/hooks/use-game';
import { getSuitFromCardIndex } from '~/utils/get-suit-from-card-index';

interface CardPositionType {
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
}

interface PlayerProps {
  name: string;
  position: number;
  vote: string | null;
}

export function Player({ name, position, vote }: PlayerProps) {
  const game = useGame();

  const isNotDesktop = useBreakpointValue({ base: true, lg: false });

  let rotation = 0;
  let direction = 'column';
  let nameRotation = 0;
  let cardPosition: CardPositionType = {
    marginTop: isNotDesktop ? '70px' : '100px',
  };

  const isTopLeftPosition = useBreakpointValue({
    base: position === 15,
    lg: position === 13,
  });

  const isTopRightPosition = useBreakpointValue({
    base: position === 13,
    lg: position === 14,
  });

  const isBottomMiddlePosition = useBreakpointValue({
    base: [8, 6].includes(position),
    lg: [11, 3, 4, 12].includes(position),
  });

  const isBottomLeftPosition = useBreakpointValue({
    base: position === 16,
    lg: position === 15,
  });

  const isBottomRightPosition = useBreakpointValue({
    base: position === 14,
    lg: position === 16,
  });

  const isRightMiddlePosition = useBreakpointValue({
    base: [9, 1, 2, 10].includes(position),
    lg: [6, 8].includes(position),
  });

  const isLeftMiddlePosition = useBreakpointValue({
    base: [11, 3, 4, 12].includes(position),
    lg: [5, 7].includes(position),
  });

  if (isLeftMiddlePosition) {
    rotation = 270;
    direction = 'row';
    nameRotation = 270;
    cardPosition = { marginLeft: isNotDesktop ? '60px' : '120px' };
  }
  if (isRightMiddlePosition) {
    rotation = 90;
    direction = 'row-reverse';
    nameRotation = 90;
    cardPosition = { marginRight: isNotDesktop ? '60px' : '120px' };
  }
  if (isBottomMiddlePosition) {
    rotation = 180;
    cardPosition = { marginBottom: isNotDesktop ? '70px' : '100px' };
  }
  if (isTopLeftPosition) {
    rotation = 315;
    cardPosition = {
      marginTop: isNotDesktop ? '40px' : '80px',
      marginLeft: isNotDesktop ? '50px' : '100px',
    };
  }
  if (isTopRightPosition) {
    rotation = 45;
    cardPosition = {
      marginTop: isNotDesktop ? '40px' : '80px',
      marginRight: isNotDesktop ? '50px' : '100px',
    };
  }
  if (isBottomLeftPosition) {
    rotation = 230;
    cardPosition = {
      marginBottom: isNotDesktop ? '40px' : '80px',
      marginLeft: isNotDesktop ? '50px' : '100px',
    };
  }
  if (isBottomRightPosition) {
    rotation = 135;
    cardPosition = {
      marginBottom: isNotDesktop ? '40px' : '80px',
      marginRight: isNotDesktop ? '50px' : '100px',
    };
  }

  if (isBottomLeftPosition ?? isBottomMiddlePosition ?? isBottomRightPosition)
    direction = 'column-reverse';

  return (
    <Flex
      direction={direction as FlexboxProps['flexDirection']}
      align="center"
      position={'relative'}
    >
      <div style={{ transform: `rotate(${nameRotation}deg)` }}>
        <Box
          noOfLines={1}
          fontSize={{ base: 'sm', lg: 'lg' }}
          fontWeight="bold"
          my={2}
        >
          {name}
        </Box>
      </div>
      <div style={{ transform: `rotate(${rotation}deg)` }}>
        <ChairIcon isReady={Boolean(vote)} />
      </div>
      {game.isRevealed && !!vote ? (
        <div
          style={{
            position: 'absolute',
            ...cardPosition,
          }}
        >
          <MiniCard
            points={vote}
            suit={getSuitFromCardIndex(game.votingSystem.values.indexOf(vote))}
          />
        </div>
      ) : undefined}
    </Flex>
  );
}
