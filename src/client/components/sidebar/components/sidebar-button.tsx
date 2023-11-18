import { ReactNode } from 'react';

import { As, Button, ButtonProps, HStack, Icon, Text } from '@chakra-ui/react';

interface SidebarButtonProps extends ButtonProps {
  icon: As;
  label: string;
  children?: ReactNode;
}

export const SidebarButton = (props: SidebarButtonProps) => {
  const { icon, label, children, ...buttonProps } = props;
  return (
    <Button
      variant="tertiary"
      colorScheme="gray"
      justifyContent="start"
      fontWeight="normal"
      {...buttonProps}
    >
      <HStack spacing="3" flex={1}>
        <Icon as={icon} boxSize={4} />
        <Text>{label}</Text>
      </HStack>
      {children}
    </Button>
  );
};
