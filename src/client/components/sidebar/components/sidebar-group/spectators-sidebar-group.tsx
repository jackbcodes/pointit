import { useMemo } from 'react';

import {
  Box,
  Collapse,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';

import { useGame } from '~/hooks/use-game';

import { SidebarGroup } from './sidebar-group';

export function SpectatorsSidebarGroup() {
  const game = useGame();

  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  const spectators = useMemo(
    () => game.players.filter(({ isSpectator }) => isSpectator),
    [game.players],
  );

  const hasSpectators = spectators.length > 0;

  return (
    <SidebarGroup
      title="Spectators"
      icons={
        hasSpectators ? (
          <IconButton
            aria-label="Open work item"
            icon={<Icon as={isOpen ? ChevronUp : ChevronDown} />}
            variant="ghost"
            size="sm"
            color="muted"
            onClick={onToggle}
          />
        ) : undefined
      }
    >
      <Collapse in={isOpen}>
        {hasSpectators ? (
          <Stack spacing={1}>
            {spectators.map(({ name }, i) => (
              <HStack key={i} flex="1" spacing="3">
                <Icon as={Eye} boxSize="4" color="subtle" />
                <Box noOfLines={1} color="muted">
                  {name}
                </Box>
              </HStack>
            ))}
          </Stack>
        ) : (
          <Text fontSize="sm" fontWeight="medium" color="muted">
            No spectators
          </Text>
        )}
      </Collapse>
    </SidebarGroup>
  );
}
