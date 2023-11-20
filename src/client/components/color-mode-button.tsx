import { Icon, IconButton, useColorMode } from '@chakra-ui/react';
import { Moon, Sun } from 'lucide-react';

export function ColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      variant="tertiary"
      onClick={toggleColorMode}
      aria-label="Toggle color mode"
      size="md"
      icon={<Icon as={colorMode === 'light' ? Moon : Sun} />}
    />
  );
}
