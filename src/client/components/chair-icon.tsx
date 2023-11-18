import { Icon, Show, useColorModeValue } from '@chakra-ui/react';

interface ChairIconProps {
  isReady: boolean;
}

export const ChairIcon = ({ isReady }: ChairIconProps) => {
  const notReadyColor = useColorModeValue('gray.300', 'gray.500');
  return (
    <>
      <Show above="lg">
        <Icon
          color={isReady ? 'red.600' : notReadyColor}
          viewBox="0 0 87 85"
          width="87px"
          height="85px"
          transition="all 0.2s"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.18518 27.5806C1.90615 28.2957 2.84716 28.8809 3.27724 28.8809C3.70732 28.8809 6.87875 26.2852 10.3236 23.1135C14.461 19.3036 17.7833 16.9853 20.1088 16.285C22.5609 15.5459 29.8314 15.2239 44.0508 15.2239C67.9019 15.2239 68.2195 15.305 77.6154 23.7872C80.7185 26.589 83.5991 28.8809 84.0158 28.8809C84.4317 28.8809 85.3752 28.2833 86.1112 27.5524C87.6581 26.0154 87.2497 24.144 84.3809 19.6297C77.6304 9.00713 69.0321 3.74714 54.1518 1.1366C44.9851 -0.470779 40.2392 -0.395462 30.9683 1.5041C17.3082 4.30335 8.04981 10.343 2.40874 20.1346C-0.500971 25.1836 -0.602658 25.8043 1.18518 27.5806ZM10.2844 60.1486C15.1662 77.3745 34.1431 88.4168 51.3463 84.04C58.7344 82.1603 62.9418 79.8013 67.8986 74.759C81.3195 61.1087 81.2694 40.0977 67.7844 26.6883C50.9454 9.94408 22.355 14.9599 12.4015 36.4046C9.10501 43.5062 8.25818 53.0007 10.2844 60.1486Z"
            fill="currentColor"
          />
        </Icon>
      </Show>
      <Show below="lg">
        <Icon
          color={isReady ? 'red.600' : notReadyColor}
          viewBox="0 0 43 42"
          width="43px"
          height="42px"
          transition="all 0.2s"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.585778 13.628C0.94212 13.9814 1.40722 14.2705 1.61979 14.2705C1.83235 14.2705 3.39984 12.988 5.10245 11.4208C7.1474 9.53826 8.78945 8.39272 9.93881 8.04672C11.1508 7.6815 14.7443 7.52241 21.7722 7.52241C33.5607 7.52241 33.7177 7.56249 38.3616 11.7537C39.8954 13.1381 41.3191 14.2705 41.525 14.2705C41.7306 14.2705 42.1969 13.9753 42.5607 13.6141C43.3253 12.8547 43.1234 11.93 41.7055 9.6994C38.3691 4.45058 34.1193 1.85153 26.7647 0.561611C22.234 -0.23262 19.8883 -0.195404 15.3062 0.743198C8.55464 2.12636 3.97864 5.11067 1.19053 9.94888C-0.247606 12.4436 -0.297865 12.7504 0.585778 13.628ZM5.08309 29.7205C7.49591 38.2321 16.8753 43.6883 25.3781 41.5256C29.0296 40.5968 31.1092 39.4312 33.5591 36.9398C40.1924 30.1949 40.1677 19.813 33.5026 13.1872C25.1799 4.91354 11.049 7.39195 6.12946 17.9881C4.50018 21.4972 4.08163 26.1886 5.08309 29.7205Z"
            fill="currentColor"
          />
        </Icon>
      </Show>
    </>
  );
};