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
  ModalCloseButton,
  VStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { TRPCClientError } from '@trpc/client';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { VotingSystemRadioCards } from '~/components/voting-system-radio-cards';
import { DEFAULT_VOTING_SYSTEMS, DefaultVotingSystemName } from '~/constants';
import { api } from '~/utils/api';

interface FormInputs {
  gameName: string;
  playerName: string;
  votingSystemName: DefaultVotingSystemName;
}

interface StartGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StartGameModal({ isOpen, onClose }: StartGameModalProps) {
  const playerQuery = api.player.get.useQuery();
  const createGame = api.game.create.useMutation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    try {
      const gameId = await createGame.mutateAsync({
        gameName: formData.gameName,
        playerName: formData.playerName,
        votingSystem: {
          name: formData.votingSystemName,
          values: DEFAULT_VOTING_SYSTEMS[formData.votingSystemName],
        },
      });

      onClose();
      navigate(`/game/${gameId}`);
    } catch (error) {
      setError('root.serverError', {
        message:
          error instanceof TRPCClientError
            ? error.message
            : 'There was an error joining the game, please try again.',
      });
    }
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
        <ModalHeader>Start game</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.gameName}>
                <FormLabel htmlFor="medium" size="md">
                  Game&apos;s name
                </FormLabel>
                <Input
                  id="medium"
                  size="md"
                  {...register('gameName', {
                    required: "Please enter the game's name",
                  })}
                />
                <FormErrorMessage>{errors.gameName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.playerName}>
                <FormLabel htmlFor="medium" size="md">
                  Your name
                </FormLabel>
                <Input
                  id="medium"
                  size="md"
                  defaultValue={playerQuery.data?.name}
                  {...register('playerName', {
                    required: 'Please enter your name',
                  })}
                />
                <FormErrorMessage>
                  {errors.playerName?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.votingSystemName}>
                <FormLabel>Voting system</FormLabel>
                <Controller
                  control={control}
                  name="votingSystemName"
                  defaultValue={DefaultVotingSystemName.FIBONACCI}
                  render={({ field: { onChange, value, name } }) => (
                    <VotingSystemRadioCards
                      defaultValue={DefaultVotingSystemName.FIBONACCI}
                      onChange={onChange}
                      value={value}
                      name={name}
                    />
                  )}
                />
              </FormControl>
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
