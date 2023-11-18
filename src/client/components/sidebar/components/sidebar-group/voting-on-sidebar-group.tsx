import {
  Box,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ExternalLink, MoreHorizontal } from 'lucide-react';

import { AddNewWorkItemModal } from '~/components/modals/add-new-work-item-modal';
import { EditWorkItemModal } from '~/components/modals/edit-work-item-modal';
import { SeeFullDetailsWorkItemModal } from '~/components/modals/see-full-details-work-item-modal';
import { useGame } from '~/hooks/use-game';
import { api } from '~/utils/api';

import { SidebarGroup } from './sidebar-group';

export const VotingOnSidebarGroup = () => {
  const game = useGame();

  const remove = api.workItem.remove.useMutation();

  const addNewModal = useDisclosure();
  const editModal = useDisclosure();
  const fullDetailsModal = useDisclosure();

  return (
    <SidebarGroup
      title="Voting on"
      icons={
        <>
          {game.workItem?.url && (
            <Link href={game.workItem?.url} isExternal>
              <IconButton
                aria-label="Open work item"
                icon={<Icon as={ExternalLink} />}
                variant="ghost"
                size="sm"
                color="muted"
              />
            </Link>
          )}
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="More actions work item"
              icon={<Icon as={MoreHorizontal} boxSize={3} />}
              size="xs"
              variant="tertiary"
              colorScheme="gray"
            />
            <MenuList>
              {game.workItem ? (
                <>
                  <MenuItem onClick={fullDetailsModal.onOpen}>Open</MenuItem>
                  <MenuDivider />

                  <MenuItem onClick={editModal.onOpen}>Edit</MenuItem>
                  <MenuItem onClick={async () => await remove.mutateAsync()}>
                    Remove
                  </MenuItem>
                  <MenuDivider />
                </>
              ) : undefined}
              <MenuItem onClick={addNewModal.onOpen}>Add new</MenuItem>
            </MenuList>
          </Menu>
        </>
      }
    >
      {game.workItem ? (
        <Stack spacing="1">
          <Box fontSize="sm" fontWeight="medium" noOfLines={1}>
            {game.workItem.title}
          </Box>
          <Box fontSize="sm" color="muted" noOfLines={3}>
            {game.workItem.description}
          </Box>
        </Stack>
      ) : (
        <Text fontSize="sm" fontWeight="medium" color="muted">
          Add a work item to get started
        </Text>
      )}
      <AddNewWorkItemModal
        isOpen={addNewModal.isOpen}
        onClose={addNewModal.onClose}
      />
      <EditWorkItemModal
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
      />
      <SeeFullDetailsWorkItemModal
        isOpen={fullDetailsModal.isOpen}
        onClose={fullDetailsModal.onClose}
      />
    </SidebarGroup>
  );
};
