import React, { useEffect, useState } from 'react';
import { GameProvider, useGame } from './state/GameContext';
import { CanvasContainer } from './components/3d/CanvasContainer';
import { MainMenu } from './components/ui/MainMenu';
import { HowToPlayModal } from './components/ui/HowToPlayModal';
import { HUD } from './components/ui/HUD';
import { InteractionTooltip } from './components/ui/InteractionTooltip';
import { PasswordTerminal } from './components/ui/PasswordTerminal';
import { WinSequenceOverlay } from './components/ui/WinSequenceOverlay';
import { LossSequenceOverlay } from './components/ui/LossSequenceOverlay';
import { AdminModal } from './components/ui/AdminModal';
import { SettingsModal } from './components/ui/SettingsModal';
import { PauseModal } from './components/ui/PauseModal';
import { DifficultySelectModal } from './components/ui/DifficultySelectModal';
import { DoorKeypadModal } from './components/ui/DoorKeypadModal';
import { CinematicNotification } from './components/ui/CinematicNotification';
import { audioManager } from './audio/AudioManager';

const GameInterface: React.FC = () => {
  const { currentScene, setScene, doorUnlocked } = useGame();
  const [doorKeypadOpen, setDoorKeypadOpen] = useState<boolean>(false);

  // Handle global keyboard interaction (e.g. 'E' to interact/advance)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'e' || e.key === 'E') {
        if (currentScene === 'BANK_EXTERIOR') {
          if (!doorUnlocked) {
            setDoorKeypadOpen(true);
            audioManager.playSfx('click');
          } else {
            audioManager.playSfx('door');
            setScene('BANK_ENTRY');
            setTimeout(() => setScene('BANK_INTERIOR'), 1200);
          }
        } else if (currentScene === 'BANK_INTERIOR') {
          audioManager.playSfx('footstep');
          setScene('SECURITY_CORRIDOR');
        } else if (currentScene === 'SECURITY_CORRIDOR') {
          audioManager.playSfx('footstep');
          setScene('VAULT_ROOM');
        } else if (currentScene === 'VAULT_ROOM') {
          audioManager.playSfx('click');
          setScene('PASSWORD_TERMINAL');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const handleOpenDoor = () => setDoorKeypadOpen(true);
    window.addEventListener('open-door-keypad', handleOpenDoor);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-door-keypad', handleOpenDoor);
    };
  }, [currentScene, setScene, doorUnlocked]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none font-cinematic">
      {/* 3D WebGL Canvas Layer */}
      <CanvasContainer />

      {/* Dynamic Vignette / Scanline Cinematic Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_70%,rgba(0,0,0,0.8)_100%)] z-10" />

      {/* Toast Notifications */}
      <CinematicNotification />

      {/* Main Menu UI */}
      {currentScene === 'MAIN_MENU' && <MainMenu />}

      {/* Difficulty Slider Modal */}
      <DifficultySelectModal />

      {/* Entrance Door Keypad Modal */}
      <DoorKeypadModal
        isOpen={doorKeypadOpen}
        onClose={() => setDoorKeypadOpen(false)}
      />

      {/* How To Play Screen */}
      {currentScene === 'HOW_TO_PLAY' && <HowToPlayModal />}

      {/* Gameplay HUD & Tooltips */}
      <HUD />
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center pointer-events-auto">
        <InteractionTooltip onOpenDoorKeypad={() => setDoorKeypadOpen(true)} />
      </div>

      {/* Interactive Vault Word Password Terminal */}
      <PasswordTerminal />

      {/* Cinematic Win & Loss Sequences (3 green screen blast videos) */}
      <WinSequenceOverlay />
      <LossSequenceOverlay />

      {/* Admin Screen */}
      <AdminModal />

      {/* Settings Screen */}
      <SettingsModal />

      {/* Pause Menu */}
      <PauseModal />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <GameInterface />
    </GameProvider>
  );
}
