import { useState } from 'react';

import { useIdleTimer } from 'react-idle-timer';
import { useNavigate } from 'react-router-dom';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { api } from '~/utils/api';

const timeout = 1000 * 60 * 30;
const promptBeforeIdle = 1000 * 60 * 2;

export function IdlePromptDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const leaveGame = api.player.leaveGame.useMutation();

  const onIdle = () => {
    setIsOpen(false);
    leaveGame.mutate();
    navigate('/');
  };

  const onPrompt = () => {
    setIsOpen(true);
  };

  const onActive = () => {
    setIsOpen(false);
  };

  const { activate } = useIdleTimer({
    onIdle,
    onPrompt,
    onActive,
    timeout,
    promptBeforeIdle,
    throttle: 500,
  });

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hellooo... anyone home?</AlertDialogTitle>
          <AlertDialogDescription>
            You&apos;ve been idle for a while now. You will be kicked from the
            game shortly.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={activate}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
