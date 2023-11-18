import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { api } from '~/utils/api';

interface Inputs {
  title: string;
  description: string;
  link: string;
}

interface AddNewWorkItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddNewWorkItemModal = ({
  isOpen,
  onClose,
}: AddNewWorkItemModalProps) => {
  const add = api.workItem.add.useMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // TODO: Handle error
    await add.mutateAsync(data);
    reset();
    onClose();
  };

  //   if (!router.isReady) return null;

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
        <ModalHeader>Add new work item</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel htmlFor="medium" size="md">
                  Title
                </FormLabel>
                <Input
                  id="medium"
                  size="md"
                  {...register('title', {
                    required: 'Please enter the title',
                  })}
                />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.description}>
                <FormLabel htmlFor="medium" size="md">
                  Description
                </FormLabel>
                <Textarea id="medium" size="md" {...register('description')} />
                <FormErrorMessage>
                  {errors.description?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.link}>
                <FormLabel htmlFor="medium" size="md">
                  External link
                </FormLabel>
                <Input id="medium" size="md" {...register('link')} />
                <FormErrorMessage>{errors.link?.message}</FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" isLoading={isSubmitting} type="submit">
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
