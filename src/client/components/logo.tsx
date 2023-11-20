import { Icon, useColorModeValue } from '@chakra-ui/react';

// TODO: Minify SVGs - https://jakearchibald.github.io/svgomg/

export function Logo() {
  const color = useColorModeValue('gray.800', 'white');
  return (
    <Icon color={color} viewBox="0 0 167 50" width="auto" height="40px">
      <path
        d="M62.4288 12.0998C63.8897 12.9077 65.0357 14.048 65.8675 15.5208C66.699 16.9939 67.1149 18.692 67.1149 20.6167C67.1149 22.541 66.699 24.2459 65.8675 25.7304C65.0357 27.2153 63.8897 28.3617 62.4288 29.1692C60.9678 29.9771 59.3107 30.3808 57.4573 30.3808C54.8913 30.3808 52.8604 29.5255 51.3638 27.8148V37.0443H46.9092V11.1022H51.1498V13.5965C51.8859 12.6937 52.7948 12.0167 53.8759 11.5652C54.9566 11.114 56.1504 10.8882 57.4573 10.8882C59.3107 10.8882 60.9678 11.2927 62.4288 12.0998ZM61.0031 24.9286C62.0599 23.8361 62.5889 22.3987 62.5889 20.6167C62.5889 18.8347 62.0599 17.3976 61.0031 16.3047C59.9459 15.2123 58.598 14.6654 56.9587 14.6654C55.8898 14.6654 54.9274 14.9095 54.0721 15.3959C53.2167 15.8832 52.5398 16.578 52.0408 17.4807C51.5418 18.3839 51.2925 19.4289 51.2925 20.6167C51.2925 21.8048 51.5418 22.8499 52.0408 23.7526C52.5398 24.6558 53.2167 25.3506 54.0721 25.837C54.9274 26.3243 55.8898 26.5679 56.9587 26.5679C58.598 26.5679 59.9459 26.0215 61.0031 24.9286Z"
        fill="currentColor"
      />
      <path
        d="M88.7646 15.5908C88.1874 14.6135 87.4638 13.7772 86.5878 13.0816C86.1455 12.7297 85.664 12.4115 85.1459 12.1326C84.625 11.8509 84.0814 11.6202 83.5155 11.437C82.9918 11.6482 82.3213 12.0227 81.7582 12.6928C81.2146 13.3378 80.939 14.05 80.8149 14.7261C82.0541 14.8923 83.1045 15.4189 83.9715 16.303C85.0389 17.3955 85.574 18.8346 85.574 20.6146C85.574 22.397 85.0389 23.836 83.9715 24.9261C82.9014 26.0185 81.547 26.5678 79.9081 26.5678C78.2692 26.5678 76.9201 26.0185 75.8641 24.9261C74.4076 23.4193 74.3128 21.3207 74.2787 20.6146C74.1523 18.0028 75.2942 15.0727 77.6693 13.1801C79.6657 11.589 81.8243 11.2959 82.8 11.2286C81.8932 11.0004 80.9272 10.8877 79.9081 10.8877C77.9846 10.8877 76.2501 11.3016 74.704 12.1326C74.1831 12.4143 73.6987 12.7325 73.2536 13.0901C72.3836 13.7829 71.6625 14.6163 71.0881 15.5908C70.2206 17.0635 69.7872 18.7393 69.7872 20.6146C69.7872 22.493 70.221 24.1741 71.0881 25.6582C71.6568 26.6327 72.3751 27.469 73.2369 28.1617C73.6873 28.525 74.1746 28.8488 74.704 29.1334C76.2501 29.964 77.9846 30.3811 79.9081 30.3811C81.8567 30.3811 83.6027 29.9644 85.1459 29.1334C85.6696 28.8517 86.1541 28.5306 86.5992 28.1731C87.4695 27.4775 88.1902 26.6384 88.7646 25.6582C89.6293 24.1741 90.063 22.493 90.063 20.6146C90.063 18.7393 89.6293 17.0639 88.7646 15.5908Z"
        fill="currentColor"
      />
      <path
        d="M94.5533 7.2004C94.0065 6.69004 93.7336 6.05442 93.7336 5.29394C93.7336 4.53387 94.0065 3.89866 94.5533 3.38749C95.0997 2.87713 95.7767 2.62134 96.5846 2.62134C97.3921 2.62134 98.0691 2.86537 98.6159 3.35182C99.1624 3.83907 99.4356 4.45077 99.4356 5.18693C99.4356 5.97091 99.1684 6.63005 98.6338 7.16473C98.0995 7.69901 97.416 7.96655 96.5846 7.96655C95.7767 7.96655 95.0997 7.71157 94.5533 7.2004ZM94.3397 11.1025H98.7939V30.1318H94.3397V11.1025Z"
        fill="currentColor"
      />
      <path
        d="M121.208 12.9904C122.657 14.3926 123.382 16.4709 123.382 19.2267V30.1311H118.927V19.7966C118.927 18.1342 118.535 16.8808 117.751 16.0372C116.967 15.194 115.85 14.772 114.401 14.772C112.762 14.772 111.467 15.2654 110.517 16.2508C109.567 17.2371 109.092 18.6563 109.092 20.5092V30.1307H104.637V11.1018H108.878V13.5608C109.614 12.6819 110.541 12.0167 111.658 11.5652C112.774 11.114 114.033 10.8882 115.435 10.8882C117.834 10.8878 119.758 11.5891 121.208 12.9904Z"
        fill="currentColor"
      />
      <path
        d="M140.487 29.0981C139.964 29.5258 139.328 29.8465 138.58 30.0605C137.831 30.2741 137.041 30.3811 136.21 30.3811C134.119 30.3811 132.504 29.8351 131.364 28.7418C130.223 27.6493 129.653 26.0575 129.653 23.9666V14.808H126.517V11.2444H129.653V6.89722H134.107V11.2448H139.203V14.8084H134.107V23.8599C134.107 24.7866 134.333 25.4936 134.784 25.9804C135.235 26.4673 135.889 26.7109 136.744 26.7109C137.742 26.7109 138.573 26.4499 139.239 25.9269L140.487 29.0981Z"
        fill="currentColor"
      />
      <path
        d="M146.045 11.1025H150.5L146.722 30.1318H142.268L146.045 11.1025ZM147.364 7.23607C146.865 6.74963 146.615 6.16144 146.615 5.47231C146.615 4.66481 146.895 3.98784 147.453 3.441C148.011 2.89456 148.741 2.62134 149.644 2.62134C150.428 2.62134 151.07 2.85321 151.569 3.31614C152.068 3.77908 152.317 4.34416 152.317 5.00897C152.317 5.88822 152.038 6.60086 151.479 7.14689C150.921 7.69374 150.19 7.96655 149.288 7.96655C148.504 7.96655 147.863 7.72333 147.364 7.23607Z"
        fill="currentColor"
      />
      <path
        d="M158.838 23.7527C158.79 24.1329 158.767 24.4065 158.767 24.5723C158.767 25.9976 159.515 26.7107 161.012 26.7107C161.938 26.7107 162.769 26.4614 163.506 25.9624L164.29 29.2406C163.079 30.0011 161.546 30.3809 159.693 30.3809C158.054 30.3809 156.735 29.9297 155.738 29.027C154.74 28.1242 154.241 26.8769 154.241 25.2854C154.241 24.7633 154.288 24.2643 154.383 23.7884L156.201 14.8082H153.101L153.813 11.2446H156.913L157.769 6.89697H162.223L161.332 11.2446H166.464L165.751 14.8082H160.62L158.838 23.7527Z"
        fill="currentColor"
      />
      <path
        d="M25.2131 17.6311C25.2131 19.8663 24.5435 21.6649 23.2041 23.0359C21.8648 24.4065 20.1671 25.0919 18.111 25.0919C16.055 25.0919 14.365 24.4065 13.0374 23.0359C11.7135 21.6653 11.0515 19.8663 11.0515 17.6311C11.0515 15.3959 11.7135 13.5932 13.0374 12.2226C14.365 10.8557 16.055 10.1707 18.111 10.1707C20.1671 10.1707 21.8648 10.8561 23.2041 12.2226C24.5435 13.5936 25.2131 15.3963 25.2131 17.6311Z"
        fill="currentColor"
      />
      <path
        d="M18.6015 0.00770214C18.4458 0.00364843 18.2902 0 18.1341 0C17.9744 0 17.8187 0.0040538 17.663 0.00770214C3.20146 0.338484 -4.96391 16.8131 3.30281 28.6893L5.42087 31.734V17.6308C5.42087 15.2788 5.96609 13.1762 7.05248 11.3305C8.13888 9.48486 9.64969 8.04012 11.5886 6.99669C13.5238 5.95327 15.6966 5.43156 18.1106 5.43156C20.5521 5.43156 22.7403 5.95327 24.6796 6.99669C26.6148 8.04012 28.1257 9.48486 29.2121 11.3305C30.2984 13.1762 30.8437 15.2788 30.8437 17.6308C30.8437 19.9827 30.2984 22.089 29.2121 23.9505C28.1257 25.8156 26.6148 27.268 24.6796 28.3078C22.7403 29.3512 20.5521 29.873 18.1106 29.873C15.6966 29.873 13.5238 29.3512 11.5886 28.3078C11.4058 28.2105 11.2266 28.1055 11.0515 28.0001V39.8216L18.1341 50C23.0756 42.8939 28.0207 35.7918 32.9617 28.6893C41.2284 16.8131 33.0631 0.338484 18.6015 0.00770214Z"
        fill="currentColor"
      />
    </Icon>
  );
}
