import { useColorModeValue } from '@chakra-ui/react';

type BackgroundColor = 'surface' | 'canvas';

export const useBackgroundColor = (backgroundColor: BackgroundColor): string =>
  useColorModeValue(
    backgroundColor === 'surface' ? 'white' : '#F7FAF8',
    backgroundColor === 'surface' ? 'gray.900' : 'gray.950',
  );
