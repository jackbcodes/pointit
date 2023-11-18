import { useEffect, useState } from 'react';

import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

import { ColorModeButton } from '~/components/color-mode-button';
import { Logo } from '~/components/logo';
import { StartGameModal } from '~/components/modals/start-game-modal';
import { TopWaves } from '~/components/top-waves';

export default function Root() {
  const [isStartGameModalOpen, setIsStartGameModalOpen] = useState(false);
  const backgroundColor = useColorModeValue('white', 'gray.900');
  const imgSrc = useColorModeValue(
    '/assets/game-screenshot-light.png',
    '/assets/game-screenshot-dark.png',
  );

  useEffect(() => {
    document.title = 'PointIt';
  }, []);

  return (
    <Flex
      direction="column"
      flex="1"
      bg={backgroundColor}
      h="100vh"
      overflow="clip"
    >
      <StartGameModal
        isOpen={isStartGameModalOpen}
        onClose={() => setIsStartGameModalOpen(false)}
      />
      <Container py="4">
        <HStack spacing="10" justify="space-between">
          <Logo />
          <ColorModeButton />
        </HStack>
      </Container>
      <Box as="section" pt={{ base: '0', md: '16' }} overflow="hidden">
        <Box
          maxW={{ base: 'xl', md: '7xl' }}
          mx="auto"
          px={{ base: '6', md: '8' }}
        >
          <Flex
            align="flex-start"
            direction={{ base: 'column', lg: 'row' }}
            justify="space-between"
            mb="20"
          >
            <Box flex="1" maxW={{ lg: '2xl' }} pt="6">
              <Badge
                colorScheme="green"
                mt="4"
                alignSelf="start"
                size={useBreakpointValue({ base: 'md', md: 'lg' })}
              >
                Unlimited free usage
              </Badge>
              <Heading as="h1" size="3xl" mt="8" fontWeight="extrabold">
                Who says you can&apos;t play card games at work?
              </Heading>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="muted"
                mt="10"
                maxW={{ base: 'full', md: 'lg' }}
              >
                Re-energise your agile ceremonies with a fun, user-friendly
                platform for real-time planning poker.
              </Text>
              <Button
                mt="10"
                minW={{ base: 'full', md: '12rem' }}
                size="lg"
                height="14"
                px="8"
                variant="primary"
                borderRadius="lg"
                onClick={() => setIsStartGameModalOpen(true)}
              >
                Start game
              </Button>
            </Box>
            <Image
              mt={{ base: 14, lg: 0 }}
              pos="relative"
              marginEnd="-20rem"
              w="50rem"
              src={imgSrc}
              alt="Screenshot for Form builder"
              boxShadow="xl"
              bgColor="transparent"
              borderRadius="md"
            />
          </Flex>
          <Box></Box>
        </Box>
      </Box>
      <TopWaves />
    </Flex>
  );
}
