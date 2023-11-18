import { theme as proTheme } from '@chakra-ui/pro-theme';
import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

const theme = extendTheme(
  {
    colors: {
      ...baseTheme.colors,
      brand: baseTheme.colors.green,
    },
    styles: {
      global: {
        html: {
          fontSize: 'lg',
        },
      },
    },
    config: {
      initialColorMode: 'light',
      useSystemColorMode: true,
    },
  },
  proTheme,
);

theme.fonts = {
  heading: "'Vodafone', -apple-system, system-ui, sans-serif",
  body: "'Vodafone', -apple-system, system-ui, sans-serif",
};

export { theme };
