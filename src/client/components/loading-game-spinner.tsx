import { Flex, Spinner, Text } from '@chakra-ui/react';

export const LoadingGameSpinner = () => (
  <Flex
    flex={1}
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    gap="2"
  >
    <Spinner />
    <Text>Shuffling cards...</Text>
  </Flex>
);
