import { Box, HStack, Text } from '@chakra-ui/react';

interface SidebarGroupProps {
  children: React.ReactNode;
  icons: React.ReactNode;
  title: string;
}

// 38px min height is hard-coded to match the height of a sm button + 2px padding (stops jumpyness)

export function SidebarGroup(props: SidebarGroupProps) {
  return (
    <Box>
      <HStack mb="3">
        <Text
          fontSize="sm"
          fontWeight="semibold"
          textTransform="uppercase"
          letterSpacing="widest"
          color="green.500"
          flex={1}
        >
          {props.title}
        </Text>
        <HStack pb="2px" spacing={0} minH="38px">
          {props.icons}
        </HStack>
      </HStack>
      {props.children}
    </Box>
  );
}
