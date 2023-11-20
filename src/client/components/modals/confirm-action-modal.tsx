import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
  button: {
    isLoading?: boolean;
    label: string;
    onClick: () => void;
  };
}

export function ConfirmActionModal({
  title,
  text,
  button,
  isOpen,
  onClose,
}: ConfirmActionModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{text}</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            onClick={async () => {
              await button.onClick();
              onClose();
            }}
            isLoading={button.isLoading}
          >
            {button.label}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
