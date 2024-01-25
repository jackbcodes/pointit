import { Header } from '~/components/header';
import { StartGameDialog } from '~/components/start-game-dialog';
import { useTheme } from '~/hooks/use-theme';
import { api } from '~/utils/api';

export function Component() {
  const { theme } = useTheme();

  const userQuery = api.user.get.useQuery();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <section className="flex-1 overflow-x-hidden md:mt-8 lg:mt-10">
        <div className="container flex flex-col gap-8 lg:flex-row">
          <div className="pt-4 lg:pt-10">
            <span className="me-2 rounded bg-green-100 px-2.5 py-1.5 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
              Built by developers for developers
            </span>
            <h1 className="mb-4 mt-7 max-w-2xl text-3xl font-bold leading-none md:text-5xl xl:text-6xl">
              Who says you can&apos;t play card games at work?
            </h1>
            <p className="mb-8 max-w-md font-light text-muted-foreground md:text-lg lg:mb-8 lg:text-xl">
              Re-energise your agile ceremonies with a fun, user-friendly
              platform for real-time planning poker.
            </p>
            <StartGameDialog
              playerName={userQuery.data?.name}
              isLoading={userQuery.isLoading}
            />
          </div>
          <img
            src={
              theme === 'light'
                ? '/images/game-screen-light.png'
                : '/images/game-screen-dark.png'
            }
            className="relative -me-80 mb-16 rounded-lg shadow-xl lg:w-[40rem] xl:w-[60rem]"
            alt="mockup"
          />
        </div>
      </section>

      <svg viewBox="0 0 900 94" xmlns="http://www.w3.org/2000/svg">
        <path
          className="fill-[#F7FAF8] dark:fill-[#788C8C]"
          d="m0 0 21.5 4.2c21.5 4.1 64.5 12.5 107.3 12.1 42.9-0.3 85.5-9.3 128.4-10.8 42.8-1.5 85.8 4.5 128.6 10.8 42.9 6.4 85.5 13 128.4 14.4 42.8 1.3 85.8-2.7 128.6-7.4 42.9-4.6 85.5-10 128.4-12.5 42.8-2.5 85.8-2.1 107.3-2l21.5 0.20001v85h-21.5-107.3-128.4-128.6-128.4-128.6-128.4-107.3-21.5v-94z"
        />
        <path
          className="fill-[#D4E4D9] dark:fill-[#536369]"
          d="m0 29 21.5-0.7c21.5-0.6 64.5-2 107.3 2.7 42.9 4.7 85.5 15.3 128.4 18.3 42.8 3 85.8-1.6 128.6-6.1 42.9-4.5 85.5-8.9 128.4-8.2 42.8 0.7 85.8 6.3 128.6 10.8 42.9 4.5 85.5 7.9 128.4 3.9 42.8-4 85.8-15.4 107.3-21l21.5-5.7v71h-21.5-107.3-128.4-128.6-128.4-128.6-128.4-107.3-21.5v-65z"
        />
        <path
          className="fill-[#B2CEB9] dark:fill-[#333D45]"
          d="m0 70 21.5-1.3c21.5-1.4 64.5-4 107.3-6.2 42.9-2.2 85.5-3.8 128.4-4.5 42.8-0.7 85.8-0.3 128.6 0.5 42.9 0.8 85.5 2.2 128.4 2.7 42.8 0.5 85.8 0.1 128.6 2 42.9 1.8 85.5 5.8 128.4 4.5 42.8-1.4 85.8-8 107.3-11.4l21.5-3.3v41h-21.5-107.3-128.4-128.6-128.4-128.6-128.4-107.3-21.5v-24z"
        />
      </svg>
    </div>
  );
}

Component.displayName = 'RootRoute';
