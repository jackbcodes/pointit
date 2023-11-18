import { Global } from '@emotion/react';

export function Fonts(): JSX.Element {
  return (
    <Global
      styles={`
      @font-face {
        font-family: 'Vodafone';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/VodafoneRg_Bold.woff2') format('woff2'), url('/fonts/VodafoneRg_Bold.woff') format('woff');
      }

      @font-face {
        font-family: 'Vodafone';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/VodafoneRg.woff2') format('woff2'), url('/fonts/VodafoneRg.woff') format('woff');
      }

      @font-face {
        font-family: 'Vodafone';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url('/fonts/VodafoneLt.woff2') format('woff2'), url('/fonts/VodafoneLt.woff') format('woff');
      }
      `}
    />
  );
}
