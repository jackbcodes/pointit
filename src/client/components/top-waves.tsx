import { Icon, useColorModeValue, chakra } from '@chakra-ui/react';

import { useBackgroundColor } from '~/hooks/use-background-color';

export const TopWaves = () => {
  const backgroundColor = useBackgroundColor('surface');
  const secondWaveColor = useColorModeValue('#C9DCCD', '#738D8C');
  const thirdWaveColor = useColorModeValue('#E0EBE3', '#404F59');
  const lastWaveColor = useBackgroundColor('canvas');

  return (
    <Icon viewBox="0 0 1440 274" fill="none" width="full" height="auto">
      <chakra.path fill={backgroundColor} d="M0 0h1440v274H0z" />
      <chakra.path
        fill="#B2CEB9"
        d="m0 27 34.3 10c34.4 10 103 30 171.5 21s136.9-47 205.4-47.8c68.5-.9 137.1 35.5 205.8 55.1C685.7 85 754.3 88 823 94.3c68.7 6.4 137.3 16 205.8 16.9 68.5.8 136.9-7.2 205.4-27.2s137.1-52 171.5-68L1440 0v274H0V27Z"
      />
      <chakra.path
        fill={secondWaveColor}
        d="m0 89 34.3 6.3c34.4 6.4 103 19 171.5 18s136.9-15.6 205.4-18.6c68.5-3 137.1 5.6 205.8 2C685.7 93 754.3 77 823 62.8c68.7-14.1 137.3-26.5 205.8-24s136.9 19.9 205.4 45.9 137.1 60.6 171.5 78L1440 180v94H0V89Z"
      />
      <chakra.path
        fill={thirdWaveColor}
        d="m0 185 34.3 4.7c34.4 4.6 103 14 171.5.5s136.9-49.9 205.4-59.9 137.1 6.4 205.8 23.5c68.7 17.2 137.3 35.2 206 24 68.7-11.1 137.3-51.5 205.8-66s136.9-3.1 205.4 11.2c68.5 14.3 137.1 31.7 171.5 40.3l34.3 8.7v102H0v-89Z"
      />
      <chakra.path
        fill={lastWaveColor}
        d="m0 230 34.3 4.5c34.4 4.5 103 13.5 171.5 17s136.9 1.5 205.4-12.7c68.5-14.1 137.1-40.5 205.8-58.1 68.7-17.7 137.3-26.7 206-30.5 68.7-3.9 137.3-2.5 205.8 12.5s136.9 43.6 205.4 60c68.5 16.3 137.1 20.3 171.5 22.3l34.3 2v27H0v-44Z"
      />
    </Icon>
  );
};
