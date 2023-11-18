import { useMemo } from 'react';

import { Button, Flex, Stack, Switch, useDisclosure } from '@chakra-ui/react';
import { Edit2, Eye, LogOut } from 'lucide-react';
import Div100vh from 'react-div-100vh';
import { useNavigate } from 'react-router-dom';

import { Logo } from '~/components/logo';
import { ChangeNameModal } from '~/components/modals/change-name-modal';
import { ConfirmActionModal } from '~/components/modals/confirm-action-modal';
import { useBackgroundColor } from '~/hooks/use-background-color';
import { useGame } from '~/hooks/use-game';
import { usePlayer } from '~/hooks/use-player';
import { api } from '~/utils/api';

import { SidebarButton } from './components/sidebar-button';
import { SpectatorsSidebarGroup } from './components/sidebar-group/spectators-sidebar-group';
import { VotingOnSidebarGroup } from './components/sidebar-group/voting-on-sidebar-group';

export const Sidebar = () => {
  const navigate = useNavigate();
  const game = useGame();
  const player = usePlayer();

  const toggleSpectatorMode = api.player.toggleSpectatorMode.useMutation();
  const toggleRevealVotes = api.game.toggleRevealVotes.useMutation();
  const leaveGame = api.player.leaveGame.useMutation();

  const changeNameModal = useDisclosure();
  const confirmActionModal = useDisclosure();
  const bgColor = useBackgroundColor('surface');

  const isAtLeastOneVote = useMemo(
    () => game.players.some(({ vote }) => vote),
    [game.players],
  );

  return (
    <>
      <Div100vh>
        <Flex as="section" h="100%" bgColor={bgColor}>
          <Flex
            flex="1"
            bg="bg-surface"
            overflowY="scroll"
            boxShadow="sm"
            width="xs"
            py={{ base: '6', sm: '8' }}
            px={{ base: '4', sm: '6' }}
          >
            <Stack justify="space-between" spacing="5" flex={1}>
              <Stack spacing={{ base: '5', sm: '6' }} shouldWrapChildren>
                <Logo />
                <Stack spacing="1">
                  <SidebarButton
                    label="Change name"
                    icon={Edit2}
                    onClick={changeNameModal.onOpen}
                  />
                  <SidebarButton
                    label="Spectator mode"
                    icon={Eye}
                    onClick={async () =>
                      await toggleSpectatorMode.mutateAsync()
                    }
                  >
                    <Switch
                      colorScheme="green"
                      isChecked={player.isSpectator}
                      defaultChecked={player.isSpectator}
                    />
                  </SidebarButton>
                </Stack>
                <VotingOnSidebarGroup />
                <SpectatorsSidebarGroup />
              </Stack>
              <Stack spacing="5">
                <Button
                  colorScheme="green"
                  onClick={async () => await toggleRevealVotes.mutateAsync()}
                  fontWeight="bold"
                  isDisabled={!isAtLeastOneVote}
                >
                  {game.isRevealed ? 'Reset votes' : 'Reveal votes'}
                </Button>
                <SidebarButton
                  label="Leave game"
                  icon={LogOut}
                  onClick={confirmActionModal.onOpen}
                />
              </Stack>
            </Stack>
          </Flex>
        </Flex>
      </Div100vh>
      <ChangeNameModal
        isOpen={changeNameModal.isOpen}
        onClose={changeNameModal.onClose}
      />
      <ConfirmActionModal
        isOpen={confirmActionModal.isOpen}
        onClose={confirmActionModal.onClose}
        title="Leave game"
        text="Are you sure you want to leave this game? You can rejoin at any time."
        button={{
          label: 'Leave',
          isLoading: false,
          onClick: async () => {
            await leaveGame.mutateAsync();
            navigate('/');
          },
        }}
      />
    </>
  );
};
