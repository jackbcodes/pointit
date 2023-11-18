import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Link,
} from '@chakra-ui/react';
import { ExternalLink } from 'lucide-react';

import { useGame } from '~/hooks/use-game';

interface SeeFullDetailsWorkItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeeFullDetailsWorkItemModal = ({
  isOpen,
  onClose,
}: SeeFullDetailsWorkItemModalProps) => {
  const game = useGame();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Full details</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Stack spacing={4}>
            <Stack spacing={1}>
              <Heading size="xxs">Title</Heading>
              <Text>{game.workItem?.title}</Text>
            </Stack>

            {game.workItem?.url ? (
              <Stack spacing={1}>
                <Heading size="xxs">Description</Heading>
                <Text>{game.workItem?.description}</Text>
              </Stack>
            ) : undefined}
          </Stack>
        </ModalBody>
        <ModalFooter>
          {game.workItem?.url ? (
            <Link
              href={game.workItem?.url}
              isExternal
              _hover={{ textDecoration: 'none' }}
            >
              <Button rightIcon={<ExternalLink />} colorScheme="green">
                Open
              </Button>
            </Link>
          ) : undefined}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
