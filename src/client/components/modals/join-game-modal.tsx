import { useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  Switch,
  VStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { TRPCClientError } from '@trpc/client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { api } from '~/utils/api';

interface FormInputs {
  playerName: string;
  isSpectator: boolean;
}

interface JoinGameModalProps {
  name?: string;
  isSpectator?: boolean;
}

export function JoinGameModal({ name, isSpectator }: JoinGameModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { gameId } = useParams();

  const joinGame = api.game.join.useMutation();
  const utils = api.useUtils();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    try {
      await joinGame.mutateAsync({ gameId: gameId!, ...formData });
      await utils.invalidate();
      setIsOpen(false);
    } catch (error) {
      setError('root.serverError', {
        message:
          error instanceof TRPCClientError
            ? error.message
            : 'There was an error joining the game, please try again',
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Join game</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.playerName}>
                <FormLabel htmlFor="medium" size="md">
                  Your name
                </FormLabel>
                <Input
                  id="medium"
                  size="md"
                  defaultValue={name}
                  {...register('playerName', {
                    required: 'Please enter your name',
                  })}
                />
                <FormErrorMessage>
                  {errors.playerName?.message}
                </FormErrorMessage>
              </FormControl>
              <HStack justifyContent="flex-start" width="100%">
                <FormLabel htmlFor="join-as-spectator" mb="0">
                  Join as spectator?
                </FormLabel>
                <Switch
                  id="join-as-spectator"
                  colorScheme="green"
                  defaultChecked={isSpectator}
                  {...register('isSpectator')}
                />
              </HStack>
              {!!errors.root?.serverError && (
                <Alert status="error">
                  <AlertIcon />
                  {errors.root.serverError.message}
                </Alert>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" isLoading={isSubmitting} type="submit">
              Let&apos;s go!
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
