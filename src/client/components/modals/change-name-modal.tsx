import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { usePlayer } from '~/hooks/use-player';
import { api } from '~/utils/api';

interface ChangeNameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Inputs {
  name: string;
}

export function ChangeNameModal({ isOpen, onClose }: ChangeNameModalProps) {
  const player = usePlayer();

  const changeName = api.player.changeName.useMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // TODO: Handle errors
    await changeName.mutateAsync(data.name);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change name</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <FormControl isInvalid={!!errors.name}>
            <ModalBody>
              <FormLabel htmlFor="name" hidden={true}>
                Display name
              </FormLabel>
              <Input
                id="display-name"
                size="lg"
                defaultValue={player.name}
                placeholder="Enter your name"
                {...register('name', {
                  required: 'Please enter your name',
                })}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="green"
                isLoading={isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </ModalFooter>
          </FormControl>
        </form>
      </ModalContent>
    </Modal>
  );
}
